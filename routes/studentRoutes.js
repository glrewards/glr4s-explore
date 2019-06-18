const mongoose = require("mongoose");
const XODStudentSchema = require("../models/xod/XODStudent");
const requireLogin = require("../middlewares/requireLogin");
const requireSchool = require("../middlewares/requireSchool");
const requireAdmin = require("../middlewares/requireAdmin");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

const Student = mongoose.model("students");

module.exports = app => {
    app.get('/api/students/all', requireLogin, async (req, res) => {
        //console.log("in /students/all",req.body);
        const students = await Student.find();
        //console.log(students);
        res.send(students);
    });

    app.get('/api/students', requireLogin, requireSchool, async (req, res) => {
        const students = await Student.find({_school: req.school._id});
        res.send(students);
    });


    app.get('/api/Students/School/:schoolId', requireLogin, requireLogin, async (req,res) => {
        const schoolId = req.params.schoolId;
        // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
        //model. and we can then create the model
        const fetcher = mongoose.model("xodstudents" + "-" + schoolId, XODStudentSchema);
         const items = await fetcher.find({},"Forename Surname DisplayName YearGroup HouseGroup Id");
         res.send(items);

    });

    //TODO: add in the right middlewares
    app.get('/api/School/:schoolId/Student/:studentId',  async (req,res) => {
        const studentId = req.params.studentId;
        const schoolId = req.params.schoolId;
        // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
        //model. and we can then create the model
        const fetcher = mongoose.model("xodstudents" + "-" + schoolId, XODStudentSchema);
        const student = await fetcher.findOne({Id: studentId});
        res.send(student);

    });

};
