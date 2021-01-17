// Url routes for fitness-app = tutor session

// Declaring variable dependencies 
const router = require("express").Router();
const Workout = require("../models/Workout");
const path = require("path")
const mongoose = require("mongoose");

// Link routes put section

//API ROUTES
//A post route to /api/workouts that starts a session
router.post("/api/workouts", (req, res) => {

  Workout.create({}).then(Workout => {
    res.json(Workout);
  })
    .catch(err => {
      res.json(err);
    })

});

//A route that adds an exercise to the session 
router.put("/api/workouts/:id", (req, res) => 
{

  Workout.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    { $push: { exercises: req.body } }, { new: true, runValidators: true })
    .then(Workout => {
      res.json(Workout);
      console.log(Workout);
    }).catch(err => {
      res.json(err);
    });

});

//Added in code per homework github instruction
router.get("/api/workouts", (req, res) => 
{

  Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } }
  ])
    .then(Workout => {

      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    })

});


//Shows the last 5 workouts
router.get("/api/workouts/range", (req, res) => {
 
  //Adding code from github instruction
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ]).sort({ day: -1 }).limit(5)
    .then(Workout => {
      console.log(Workout);
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    })

})

// Routes to stats page when "Dashboard" is clicked
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"))
});

// Routes to continue excercise page
router.get("/exercise?", (req, res) => 
{
  res.sendFile(path.join(__dirname,"../public/exercise.html"))
});

// Routes to new excercise page
router.get("/exercise", (req, res) => 
{
  res.sendFile(path.join(__dirname,"../public/exercise.html"))
});

// Routes to main page for app when selecting fitness tracker or on page load
router.get("/", (req, res) => 
{
  res.sendFile(path.join(__dirname,"../public/index.html"))
});

module.exports = router;
