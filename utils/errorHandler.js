exports.errorHandler = (err, res) => {
  const errors = {};
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const duplicateValue = err.keyValue[field];
    errors[field] = `'${duplicateValue}' already exists.`;
  } else if (err.errors) {
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  }
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    return sendErrorForDev(err, res, errors);
  } else {
    return sendErrorForPr(err, res, errors);
  }
};

const sendErrorForDev = (err, res, errors) => {
  res.status(400).json({
    status: false,
    massage: !Object.keys(errors).length ? `something's wrong ${err} ` : errors,
    stack: err,
  });
};

const sendErrorForPr = (err, res, errors) => {
  res.status(400).json({
    status: false,
    massage: !Object.keys(errors).length ? `something's wrong ${err} ` : errors,
  });
};
