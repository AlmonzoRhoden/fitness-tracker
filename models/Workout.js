// Models code Almonzo - tutor session help

// Creating variables dependencies
const {Schema, model} = require("mongoose");
const workoutSchema = new Schema
({
    // Time and date of excercise
    day: 
    {
        type: Date,
        default: Date.now
    },
    // Excercise section
    exercises: 
    [{
        // Exercise name
        name: 
        {
            type: String,
            trim: true
        },
        // Excercise type
        type: 
        {
            type: String,
            trim: true
        },
        // Excercise weight
        weight: 
        {
            type: Number
        },
        // Excercise sets
        sets: 
        {
            type: Number
        },
        // Excercise reps
        reps: 
        {
            type: Number
        },
        // Excercise duration
        duration: 
        {
            type: Number
        },
        // Excersice distance
        distance: 
        {
            type: Number
        }
    }]

});

const Workout = model("Workout", workoutSchema);

// Exporting Workout.js for access to other files as needed.
module.exports = Workout;