// node.js frameWork
const express = require("express");
const app = express();

const {
  getCategories,
  createCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
