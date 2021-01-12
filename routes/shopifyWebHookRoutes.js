const requireSecret = require("../middlewares/requireSecret");

module.exports = app => {
    app.post('/api/webhook/shopifyOrder', requireSecret, (req, res) => {
        res.send("made it");
    });

};
