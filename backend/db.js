const mongoose = require('mongoose');
const mongoURL = "mongodb://0.0.0.0:27017/inotebook";

const connectToMongo = async () => {  
      mongoose.connect(mongoURL);
      console.log("Connected to Mongo Successfully!");
  }

module.exports = connectToMongo;