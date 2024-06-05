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
  deleteCategoryByIdValidator,
  updateCategoryByIdValidator,
  createCategoryByIdValidator,
} = require("../utils/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(getCategories))
  .post(createCategoryByIdValidator, asyncHandler(createCategory));

router
  .route("/:id")
  .get(getCategoryByIdValidator, asyncHandler(getCategoryById))
  .put(updateCategoryByIdValidator, asyncHandler(updateCategory))
  .delete(deleteCategoryByIdValidator, asyncHandler(deleteCategory));

module.exports = router;
