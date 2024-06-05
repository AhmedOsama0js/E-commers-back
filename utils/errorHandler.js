class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
} 

module.exports = ApiError;




// exports.errorHandler = (err, res) => {
//   const errors = {};
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyPattern)[0];
//     const duplicateValue = err.keyValue[field];
//     errors[field] = `'${duplicateValue}' already exists.`;
//   } else if (err.errors) {
//     Object.keys(err.errors).forEach((key) => {
//       errors[key] = err.errors[key].message;
//     });
//   }
//   console.error(err);
//   if (process.env.NODE_ENV === "development") {
//     return sendErrorForDev(err, res, errors);
//   } else {
//     return sendErrorForPr(err, res, errors);
//   }
// };


// exports.errorHandler = (message ,statusCode) => {
//   const status = `${statusCode}`.startsWith(4) ? "fail" : "error";
//   const isOperational = true;
//   const error = {
//     statusCode,
//     status,
//     message,
//     isOperational,
//   };
//  return error
// };

// const sendErrorForDev = (err, res, errors) => {
//   res.status(400).json({
//     status: false,
//     massage: !Object.keys(errors).length ? `something's wrong ${err} ` : errors,
//     stack: err,
//   });
// };

// const sendErrorForPr = (err, res, errors) => {
//   res.status(400).json({
//     status: false,
//     massage: !Object.keys(errors).length ? `something's wrong ${err} ` : errors,
//   });
// };
