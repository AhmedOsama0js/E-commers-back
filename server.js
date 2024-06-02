// node.js frameWork
const express = require("express");
// save DataBase Action in Http request
const morgan = require("morgan");
//  to read .env file
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// call database from file config 
const dbConnection = require("./Config/Database")
const categoryRoute = require("./Routes/CategoryRoute")
// call database
dbConnection()

const app = express();

// middlewares
app.use(express.json());


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}


// Mount Route
app.use("/api/v1/categories", categoryRoute)

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`welcome to my server run port:${PORT}`);
});
