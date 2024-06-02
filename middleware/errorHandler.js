exports.errorHandler = (err) => {
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
  return errors;
};
