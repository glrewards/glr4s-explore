const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireSchool = require("../middlewares/requireSchool");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

const Student = mongoose.model("students");

module.exports = app => {
    app.get('/api/students/all', requireLogin, async (req, res) => {
        //console.log("in /students/all",req.body);
        const students = await Student.find();
        console.log(students);
        res.send(students);
    });

    app.get('/api/students', requireLogin, requireSchool, async (req, res) => {
        const students = await Student.find({_school: req.school._id});
        res.send(students);
    });

};
