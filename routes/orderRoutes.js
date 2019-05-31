const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
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
    const { finStatus, fulfillStatus, _school } = req.body.order;
    const studentId = req.body.user._student._id;

    const lineItems = req.body.order.lineItems;
    const newOrder = new Order({
      finStatus,
      fulfillStatus,
      _school,
      lineItems,
      dateReceived: Date.now()
    });
    //save the order
    try {
      //TODO: need to implement code to update students points - leave for now https://trello.com/c/ipzQalPr
      //TODO: put all this into a proper mongoose transaction
      let orderPoints = calcGLRPointsTotal(lineItems);
      const order = await newOrder.save();
      //assuming no errors we now amend the user points and save these.
      const student = await Student.findById(studentId);
      console.log(student);
      if (student){
          if (orderPoints > student.currentPoints){
            throw("Not enough points");
          }else{
            let newPoints = student.currentPoints - orderPoints;
            student.currentPoints = newPoints;
            student.save();

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
    console.log(req.body);
    res.send({}); //respond to indicate receipt
  });

  function getSum(total, num) {
    return total + num;
  }

  function calcGLRPointsTotal(lineItems) {
    let lineItemPoints = lineItems.map(line => {
      return line.glrpoints;
    });
    console.log("calcGLRPointsTotal(): ", lineItemPoints);
    let totalPoints = lineItemPoints.reduce(getSum,0);
    //console.log(lineItemPoints);
    //console.log(totalPoints);
    return totalPoints;
  }

};
