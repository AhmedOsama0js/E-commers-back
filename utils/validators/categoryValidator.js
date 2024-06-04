const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validation/validatorMiddleware");

exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  validatorMiddleware,
];
