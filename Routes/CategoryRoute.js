// node.js frameWork
const express = require("express");
// const app = express();

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
