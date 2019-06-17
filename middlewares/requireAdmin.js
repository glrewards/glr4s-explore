module.exports = (req,res, next) => {
    if (!req.user.isAdmin){
        //console.log("requireCredits(); checking user credits",req.user);
        return res.status(403).send({error: 'user needs to be an admin'});
    }
    next();
};
