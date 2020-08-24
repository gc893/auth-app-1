const Student = require("../models/student");
const { model } = require("../models/student");

module.exports = {
  index,
  addFact,
  delFact,
};

function index(req, res, next) {
  // Make the query object to use with Student.find based on
  // whether the user has submitted the search form or not
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Sorting by name
  Student.find(modelQuery)
    .sort("name")
    .exec(function (err, students) {
      if (err) return next(err);
      // Passing students and name, for use in the EJS
      res.render("students/index", {
        students,
        name: req.query.name,
        user: req.user
      });
    });
}

function addFact(req, res, next) {
  req.user.facts.push(req.body);
  req.user.save(function (err) {
    res.redirect("/students");
  });
}

function delFact(req, res, next) {
  Student.findOne({ "facts._id": req.params.id }, function (err, student) {
    student.facts.id(req.params.id).remove();
    student.save(function (err) {
      res.redirect("/students");
    });
  });
}