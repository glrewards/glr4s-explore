const mongoose = require("mongoose");
const Student = mongoose.model("students");

module.exports = async (req,res, next) => {

    if (req.params.studentId){
        const student = await Student.findById(req.params.studentId,"_school");
        req.school = student._school;
    }
    next();
};
