const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validation/validatorMiddleware");

exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];

exports.createCategoryByIdValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is too short, must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Name is too long, must be less than 32 characters"),
  validatorMiddleware,
];

exports.updateCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  check("name")
    .optional() 
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is too short, must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Name is too long, must be less than 32 characters"),
  validatorMiddleware,
];

exports.deleteCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validatorMiddleware,
];
