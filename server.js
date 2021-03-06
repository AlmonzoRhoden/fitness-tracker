// Server.js code 
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Adding router code
const routes = require("./routes/routes");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// MongoDB connection homework instruction from github
mongoose.connect
(
    process.env.MONGODB_URI || 'mongodb://localhost/fitness-tracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

app.use(routes);



app.listen(PORT, () => 
{
  console.log(`App running on port ${PORT}!`);
});
