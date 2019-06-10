const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app =>{
    //watching for post requests to stripe
    // using our requireLogin middlewares to check if the user exists on the request object.
    app.post('/api/stripe', requireLogin, async (req,res) => {
        const charge = await stripe.charges.create({
            amount:500,
            currency: 'usd',
            description: 'emaily credits: 5',
            source: req.body.id
        });
        req.user.credits+=5;
        try {
            const user = await req.user.save();
            res.send(user);
        }catch(err){
        }

        });
};
