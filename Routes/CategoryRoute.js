const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const {
  getCategoryByIdValidator,
} = require("../utils/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(getCategories))
  .post(asyncHandler(createCategory));

router
  .route("/:id")
  .get(getCategoryByIdValidator, asyncHandler(getCategoryById))
  .put(getCategoryByIdValidator, asyncHandler(updateCategory)) 
  .delete(getCategoryByIdValidator, asyncHandler(deleteCategory)); 

module.exports = router;
