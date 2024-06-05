// node.js frameWork
const express = require("express");
// save DataBase Action in Http request
const morgan = require("morgan");
//  to read .env file
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
// call database from file config
const dbConnection = require("./Config/Database");
const categoryRoute = require("./Routes/CategoryRoute");
const globalError = require("./middleware/errorMiddleware");
const ApiError = require("./utils/errorHandler");
// call database
dbConnection();

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

// Mount Route
app.use("/api/v1/categories", categoryRoute);

// global error handling middleware

app.all("*", (req, res, next) => {
  return next(new ApiError(`Can't Find Route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8888;
const server = app.listen(PORT, () => {
  console.log(`welcome to my server run port:${PORT}`);
});

// handling global error

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down...`);
    process.exit(1);
  });
});
