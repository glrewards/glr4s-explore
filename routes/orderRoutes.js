const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
const findStudentSchool = require("../middlewares/findStudentSchool");
const keys = require("../config/keys");
//const querystring = require('querystring');
//const request = require('request-promise');
const { request } = require("graphql-request");
const { GraphQLClient } = require("graphql-request");

const Order = mongoose.model("orders");
const Student = mongoose.model("students");

/*
const DraftOrderFragment = gql`
  fragment DraftOrderFragment on DraftOrder{
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    customer{
      displayName
    }
    lineItems (first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              src
            }
            price
          }
          quantity
        }
      }
    }
  }
`;

const draftOrderMutation = gql `mutation {
  draftOrderCreate($input: DraftOrderInput!) {
    draftOrder {
      ...DraftOrderFragment
     }

    }
  }
}
${DraftOrderFragment}
`;
*/

module.exports = app => {
  // for a given student retrieve their orderitems if any exist. I am assuming there could be a lot and starting to add
  //pagination
  //TODO: add requireLogin middleware back in
  app.get("/api/orders/:studentId",requireLogin, findStudentSchool, async (req,res) => {
    //get all the open orders for the school
    const orders = await Order.find({_school: req.school});
    if (orders.length > 1 || orders.length === 0) {
      throw "too many or zero orders  found";
    }

    //now search the array to find the lineitems that belong to the the student only
    let myItems = filterByStudent(orders[0].lineItems,req.params.studentId);
    res.send(myItems);
  });

  //:TODO This should be an admin function for the school to see all orders - will need more middlewares etc
  app.get("/api/orders", requireLogin, requireStudent, async (req, res) => {
    const orders = await Order.find({ _school: req.student._school }).select({
      _lineItems: false
    });
    res.send(orders);
  });

  //TODO: rework the webhook below to trap webhooks sent by shopify
  /*
    app.post("/api/surveys/webhooks", (req, res) => {
        console.log(req);
        const p = new Path("/api/surveys/:surveyId/:choice");

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy("email", "surveyId")
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { "recipients.$.responded": true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();

        res.send({});
    });
*/
  //TODO: may not need this function but keeping it for now - delete if not required https://trello.com/c/VTZzHEdy
  /*
    app.get("/api/surveys/:surveyId/:choice", (req, res) => {
        res.send("Thanks for Voting!");
    });
*/
  //TODO: add back in requireLogin requireStudent and change the url when ready
  app.post("/api/orders/test1", async (req, res) => {
    const _school = req.body.user._student._school;
    const studentId = req.body.user._student._id;
    const lineItems = req.body.lineItems;
    let newOrder = null;

    try {
      const orders = await findOpenOrderForSchool(_school);
      if (orders.length > 1) {
        //console.log("I found an array", orders);
        throw "too many orders found";
      } else if (orders.length === 1) {
        //console.log("I found a single order Object", orders);
        //add the lineitems to this
        //console.log(orders.lineItems);
        newOrder = orders[0];
        let oldLineItems = newOrder.lineItems;
        oldLineItems.push.apply(oldLineItems, lineItems);
        newOrder.lineItems = oldLineItems;

      } else {
        //didn't find anything so create a new one
        newOrder = new Order({
          finStatus: "unpaid",
          fulfillStatus: "unfulfilled",
          _school,
          lineItems,
          dateReceived: Date.now()
        });
      }
      // if too many orders we wont get to this because we will have thrown an error
      //TODO: put all this into a proper mongoose transaction
      let orderPoints = calcGLRPointsTotal(lineItems);
      let order = null;
      //assuming no errors we now amend the user points and save these.
      const student = await Student.findById(studentId);
      if (student) {
        if (orderPoints > student.currentPoints) {
          throw "Not enough points";
        } else {
          let newPoints = student.currentPoints - orderPoints;
          student.currentPoints = newPoints;
          student.save();
          order = await newOrder.save();
        }
      }

      res.send(order);
    } catch (err) {
      console.error("error saving order: ", newOrder, err);
      res.status(422).send(err);
    }
  });

  //TODO: remove this completely it is just a test to prove we can write and run a graphql route NOT USING the storefront api
  app.get("/api/orders/test2", async (req, res) => {
    //start with a simple gql get using the admin api
    const query = `
{
  draftOrders(first: 5) {
    edges {
      node {
        totalTax
        totalPrice
        customer {
          id
          totalSpentV2 {
            amount
            currencyCode
          }
          updatedAt
        }
        note2
        name
        updatedAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}`;
    try {
      const endpoint =
        "https://" +
        keys.shopifyStoreName +
        ".myshopify.com/admin/api/" +
        keys.shopifyAPIVersion +
        "/graphql.json";

      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          "X-Shopify-Access-Token": keys.shopifyAPIPassword
        }
      });

      const data = await graphQLClient.request(query);
      console.log(JSON.stringify(data, undefined, 2));
      res.send(data);
    } catch (err) {
      console.error("error saving order: ", err);
      res.status(422).send(err);
    }
  });
  app.post("/api/draftorders/webhooks/sdfew3434", (req, res) => {
    console.log("webhook fired: ",req.body);
    res.send({}); //respond to indicate receipt
  });

  function getSum(total, num) {
    return total + num;
  }

  function calcGLRPointsTotal(lineItems) {
    let lineItemPoints = lineItems.map(line => {
      return line.glrpoints;
    });
    let totalPoints = lineItemPoints.reduce(getSum, 0);
    return totalPoints;
  }

  async function findOpenOrderForSchool(schoolId) {
    //we will only use our own db for saving and amending orders and line items
    //separately we will be using BULL or similar to schedule the sync of this data with shopify

    //first check to see if we have an order for that school in our db
    //console.log(schoolId);
    const orders = await Order.find({
      _school: schoolId,
      finStatus: "unpaid",
      fulfillStatus: "unfulfilled"
    });
    return orders;
  }

  function filterByStudent(arr,student){
    if (!arr || typeof arr != 'object') return;
    if (typeof student == 'undefined' || student == null) return arr;
    return arr.filter((line) => {
      return line._student == student;
    });
  }
};
