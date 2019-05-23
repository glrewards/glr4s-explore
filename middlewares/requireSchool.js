module.exports = (req,res, next) => {
    if (!req.school.id){
        //console.log("requireCredits(); checking user credits",req.user);
        return res.status(403).send({error: 'You need to select a school to see the students'});
    }
    next();
};
