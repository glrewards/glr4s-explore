const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");


const Order = mongoose.model("orders");

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
  app.post("/api/orders/test1", requireGLRPoints, async (req, res) => {
    const { finStatus, fulfillStatus, _school, _lineItems } = req.body;
    console.log(req.body);
    const order = new Order({
      finStatus,
      fulfillStatus,
      _school,
      _lineItems,
      dateReceived: Date.now()
    });
    //save the order
    try {
      await order.save();
      //TODO: need to implement code to update students points - leave for now https://trello.com/c/ipzQalPr
      const user = await req.order.save();
      console.log(order);
      res.send(user);
    } catch (err) {
      console.error("error saving order: ", order, err);
      res.status(422).send(err);
    }
  });

  //TODO: remove this completely it is just a test to prove we can write and run a graphql route NOT USING the storefront api
  app.post("/api/orders/test2", requireGLRPoints, async (req, res) => {
    //start with a simple gql get using the admin api
    const query = gql`
      query {
        shop {
          name
          description
          products(query: "inventory_total:>0", first: 10) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                options {
                  id
                  name
                  values
                }
                metafield(key: "glrpoints", namespace: "GLR") {
                  metakey: key
                  metavalue: value
                }
                variants(first: 5) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        src
                      }
                      price
                    }
                  }
                }
                images(first: 2) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
      //POST https://{shop}.myshopify.com/admin/api/2019-04/graphql.json
    try {

    } catch (err) {
      console.error("error saving order: ", order, err);
      res.status(422).send(err);
    }
  });
    app.post("/api/draftorders/webhooks/sdfew3434", (req, res) => {
        console.log(req.body);
        res.send({}); //respond to indicate receipt
    });
};
