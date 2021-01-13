const mongoose = require("mongoose");
const CentreSchema = mongoose.model("LearningCentre");

module.exports = async (req,res, next) => {

    //if no note then we cannot even do the check => reject
    const order = req.body;
    if (order.note !== null ){
        const results = await CentreSchema.findOne({"name": order.note});
        if (results){
            //console.log("centre found");
            //console.log(results.toString());
            req.centreId = results._id.toString();
            req.centreName = results.name;
        }else{
            return res.status(401).send({error: 'Centre Not Found'});
        }
    }else {
        console.log("No Order Note");
        return res.status(401).send({error: 'Centre Not Found'})
    }
    next();
};
