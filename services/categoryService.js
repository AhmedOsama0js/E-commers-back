const categoryModel = require("../models/CategoryModel");
const slugify = require("slugify");
// const asyncHandler = require("express-async-handler");
const { errorHandler } = require("../middleware/errorHandler");

// desc = Get list of All categories
// route =  GET  /api/v1/categories
// access = public
exports.getCategories = async (_, res) => {
  const page = 1;
  const limit = 10;
  const sKip = (page - 1) * limit
  const categories = await categoryModel.find({}).skip(sKip).limit(limit);
  res
    .status(200)
    .json({ status: true, results: categories.length, page , data: categories });
};

// desc = Create Category
// route = POST  /api/v1/categories
// access Privet
exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const category = await categoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ status: true, data: category });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({
      status: false,
      massage: errors,
    });
  }
};
