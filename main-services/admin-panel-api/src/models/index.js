const mongoose = require("mongoose");

const initDataBase = (app) => {
  const mongoUrl = `mongodb://mongodb:${process.env.MONGODB_PORT}/profolio`;
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  });
  mongoose.set("debug", true);
  const db = mongoose.connection;
  db.on("error", (...args) => {
    console.log("Conection Mongo error", ...args);
  });
  db.once("open", (...args) => {
    console.log("Conection Mongo opened", ...args);
  });
};

module.exports = initDataBase;
