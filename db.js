const mongoose = require("mongoose");

// usl for connect database
const mongoURI =
  "mongodb+srv://harshil:harshil@cluster0.ngr9j.mongodb.net/taskManager?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
