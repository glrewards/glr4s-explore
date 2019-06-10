module.exports = (req,res, next) => {
    if (!req.user._student){
        //console.log("requireCredits(); checking user credits",req.user);
        return res.status(403).send({error: 'You need to be provide a student id to see their order details'});
    }
    next();
};
