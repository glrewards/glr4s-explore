const mongoose = require("mongoose");
const XODStudentSchema = require("../models/xod/XODStudent");
const XODStudentAchievementSchema = require("../models/xod/XODStudentAchievement");
const XODAchievementSchema = require("../models/xod/XODAchievement");
const requireLogin = require("../middlewares/requireLogin");
const requireSchool = require("../middlewares/requireSchool");
const requireAdmin = require("../middlewares/requireAdmin");

const { URL } = require("url");

const Student = mongoose.model("students");

module.exports = app => {
  app.get("/api/students/all", requireLogin, async (req, res) => {
    //console.log("in /students/all",req.body);
    const students = await Student.find();
    //console.log(students);
    res.send(students);
  });

  app.get("/api/students", requireLogin, requireSchool, async (req, res) => {
    const students = await Student.find({ _school: req.school._id });
    res.send(students);
  });

  app.get(
    "/api/Students/School/:schoolId",
    requireLogin,
    requireLogin,
    async (req, res) => {
      const schoolId = req.params.schoolId;
      // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
      //model. and we can then create the model
      const fetcher = mongoose.model(
        "xodstudents" + "-" + schoolId,
        XODStudentSchema
      );
        const achFetcher = mongoose.model( "xodstudentachievements" + "-" + schoolId,XODStudentAchievementSchema);
      const items = await fetcher.find(
        {},
        "Forename Surname DisplayName YearGroup HouseGroup Id"
      );
      //need to loop
        let enriched = [];
        for (i = 0; i < items.length; i++) {
            //build a new array
            let ach = await achFetcher.findOne({
                StudentId: items[i].Id
            });
            console.log(items[0]);
            let hasAch = false;
            if(ach){
                hasAch = true;
            }
            let combined = {
                xodstudent: items[i],
            hasachievements: hasAch};
            enriched.push(combined);
            };

      res.send(enriched);
    }
  );

  app.get(
    "/api/School/:schoolId/Student/:studentId",
    requireLogin,
    requireAdmin,
    async (req, res) => {
      const studentId = req.params.studentId;
      const schoolId = req.params.schoolId;
      // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
      //model. and we can then create the model
      const achFetcher = mongoose.model( "xodstudentachievements" + "-" + schoolId);
        const fetcher = mongoose.model(
        "xodstudents" + "-" + schoolId,
        XODStudentSchema
      );
      const student = await fetcher.findOne({ Id: studentId });
      res.send(student);
    }
  );

  app.get(
    "/api/School/:schoolId/Student/:studentId/AchievementSummary",
    async (req, res) => {
      const studentId = req.params.studentId;
      const schoolId = req.params.schoolId;
      // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
      //model. and we can then create the model
      const studentAchievmentsModel = mongoose.model(
        "xodstudentachievements" + "-" + schoolId,
        XODStudentAchievementSchema
      );
      const achievementsModel = mongoose.model(
        "xodachievements" + "-" + schoolId,
        XODAchievementSchema
      );
      const studentAchievements = await studentAchievmentsModel.find({
        StudentId: studentId
      });
      //now for each of these we need to get the related achievement details

      let enriched = [];
      for (i = 0; i < studentAchievements.length; i++) {
        //build a new array
        let rootAchievement = await achievementsModel.findOne({
          Id: studentAchievements[i].AchievementId
        });
        let combined = {
          studentAchievements: studentAchievements[i],
          rootAchievement: rootAchievement
        };
        enriched.push(combined);
      }

      res.send(enriched);
    }
  );
};
