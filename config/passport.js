const passport = require("passport");
const Student = require("../models/student");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      function (accessToken, refreshToken, profile, done) {
        Student.findOne({ googleId: profile.id }, function (err, student) {
          if (err) return done(err);
          if (student) {
            return done(null, student);
          } else {
            // we have a new student via OAuth!
            console.log(profile)
            var newStudent = new Student({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
            newStudent.save(function (err) {
              if (err) return done(err);
              return done(null, newStudent);
            });
          }
        });
      }
    )
  );

  passport.serializeUser(function (student, done) {
    done(null, student.id);
  });

  passport.deserializeUser(function (id, done) {
    Student.findById(id, function (err, student) {
      done(err, student);
    });
  });