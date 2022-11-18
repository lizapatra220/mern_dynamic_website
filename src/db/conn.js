const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/lizadynamic")
  .then(() => {
    console.log("connection success");
  })
  .catch((e) => {
    console.log("failed connection");
  });
module.exports = mongoose;