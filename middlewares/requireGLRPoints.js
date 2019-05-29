//this is just a copy of the tutorial credits check and will need to be replaced

module.exports = (req,res, next) => {
    console.log(req.body);
    if ((!req.body.user) || (req.body.user.credits < 1)){
        //console.log("requireCredits(); checking user credits",req.user);
        return res.status(403).send({error: 'You need at least one credit'});
    }
    next();
};
