const mongoose = require("mongoose");

const initDataBase = (app) => {
  const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;
  const options = {
    useNewUrlParser: true,
  };
  const mongoUrl = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
  mongoose.connect(mongoUrl, options);
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
