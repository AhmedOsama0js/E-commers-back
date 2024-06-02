//  connect Database
const mongoose = require("mongoose");

 const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => console.log(`Database connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error(`Database error: ${err}`);
      process.exit(1);
    });
}

module.exports = dbConnection;