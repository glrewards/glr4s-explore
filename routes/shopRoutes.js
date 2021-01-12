const requireLogin = require("../middlewares/requireLogin");


module.exports = app => {
    app.get('/api/shop/products', requireLogin, (req, res) => {
        res.send("made it");
        });

};
