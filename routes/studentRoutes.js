//added comment to test branching
const mongoose = require("mongoose");
const XODStudentSchema = require("../models/xod/XODStudent");
const XODStudentAchievementSchema = require("../models/xod/XODStudentAchievement");
const XODAchievementSchema = require("../models/xod/XODAchievement");
const requireLogin = require("../middlewares/requireLogin");
const requireSchool = require("../middlewares/requireSchool");
const requireAdmin = require("../middlewares/requireAdmin");
const axios = require("axios");
const keys = require("../config/keys");

//const { URL } = require("url");

const Student = mongoose.model("students");

module.exports = app => {
    //this route access my old POC collection of students and not the XOD data
  app.get("/api/students/all", requireLogin, async (req, res) => {
    //console.log("in /students/all",req.body);
    const students = await Student.find();
    //console.log(students);
    res.send(students);
  });
    //this route access my old POC collection of students and not the XOD data
  app.get("/api/students", requireLogin, requireSchool, async (req, res) => {
    const students = await Student.find({ _school: req.school._id });
    res.send(students);
  });

  app.get("/api/StudentsCount/School/:schoolId", requireLogin, requireAdmin, async (req,res) =>{
      const schoolId = req.params.schoolId;
      const fetcher = mongoose.model(
          "xodstudents" + "-" + schoolId,
          XODStudentSchema
      );
      try {
          const count = await fetcher.estimatedDocumentCount();
          let ret = {
              totalstudents: count
          };
          res.send(ret);
      }catch(err){
          console.log(err.message,err);
          res.send(err);
      }


  });

  app.get("/api/Students/School/:schoolId",requireLogin, requireAdmin, async (req, res) => {
    const schoolId = req.params.schoolId;
    //check to see if there is a query and if so check that it contains an Id
    let page = 0;
    let skip = 0;
    let limit = 25;
    if (req.query) {
      page = req.query.page;
      limit = Number(req.query.limit);
      skip = page * limit;
    }
    // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
    //model. and we can then create the model
    const fetcher = mongoose.model(
      "xodstudents" + "-" + schoolId,
      XODStudentSchema
    );
    const achFetcher = mongoose.model(
      "xodstudentachievements" + "-" + schoolId,
      XODStudentAchievementSchema
    );

    const items = await fetcher
      .find({}, "_id Forename Surname DisplayName YearGroup HouseGroup Id")
        .skip(skip)
      .limit(limit);
    //need to loop
    let enriched = [];
    for (let i = 0; i < items.length; i++) {
      //build a new array
      let ach = await achFetcher.findOne({
        StudentId: items[i].Id
      });
      let hasAch = false;
      if (ach) {
        hasAch = true;
      }
      let combined = {
        xodstudent: items[i],
        hasachievements: hasAch
      };
      enriched.push(combined);
    }
    res.send(enriched);
  });

  app.get(
    "/api/School/:schoolId/Student/:studentId",
    requireLogin,
    requireAdmin,
    async (req, res) => {
      const studentId = req.params.studentId;
        console.log("student Id param: " + studentId);
      const schoolId = req.params.schoolId;
      // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
      //model. and we can then create the model
      /*
      const achFetcher = mongoose.model(
        "xodstudentachievements" + "-" + schoolId, XODStudentAchievementSchema
      );
       */
      const fetcher = mongoose.model(
        "xodstudents" + "-" + schoolId,
        XODStudentSchema
      );
      const student = await fetcher.findOne({ Id: studentId });
      res.send(student);
    }
  );

  app.post("/api/users/:userId/favourites",
      async (req,res) => {
          let uid = req.params.userId;
          let url = keys.glrAPIGateway + keys.glrAPIUser + "/" + uid + "/favourites";
          console.log(url);
          let options = {
              headers: {
                  "X-API-KEY": keys.glrAPIGatewayKey
              }
          };
          try {
              const axiosResponse = await axios.post(url, req.body, options);
              const data = axiosResponse.data;
              //console.log(data);
              res.send(data);
          } catch (err) {
              console.error("error adding favourite: ", err.response.status);
              res.send({code: err.response.status, message: err.response.statusText});
          }
      });

  app.get(
    "/api/School/:schoolId/Student/:studentId/AchievementSummary",
    async (req, res) => {
      const studentId = req.params.studentId;
      const schoolId = req.params.schoolId;
      // we need to use the schoolId parameter to identify the right underlying collection for the mongoose
      //model. and we can then create the model
      const studentAchievementsModel = mongoose.model(
        "xodstudentachievements" + "-" + schoolId,
        XODStudentAchievementSchema
      );
      const achievementsModel = mongoose.model(
        "xodachievements" + "-" + schoolId,
        XODAchievementSchema
      );
      const studentAchievements = await studentAchievementsModel.find({
        StudentId: studentId
      });
      //now for each of these we need to get the related achievement details

      let enriched = [];
      for (let i = 0; i < studentAchievements.length; i++) {
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
