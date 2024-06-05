const slugify = require("slugify");
const categoryModel = require("../models/CategoryModel");
const ApiError = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const mas = "Category";

// desc = Get list of All categories
// route =  GET  /api/v1/categories
// access = public

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const sKip = (page - 1) * limit;
  const totalCount = await categoryModel.countDocuments({});
  const categories = await categoryModel.find({}).skip(sKip).limit(limit);
  res.status(200).json({
    status: true,
    results: categories.length,
    page,
    data: categories,
    totalCount,
  });
});

//  desc = get one category
// route = GET    /api/v1/categories:id
// access = public

exports.getCategoryById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`Not Category For This id:${id}`, 404));
  }
  res.status(200).json({ status: true, data: category });
});

// desc = Create Category
// route = POST  /api/v1/categories
// access Privet

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ status: true, data: category });
});

// desc = upDate Category
// route = PUT  /api/v1/categories/id
// access Privet

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`Not Category For This id:${id}`, 404));
  }
  res.status(200).json({ status: true, data: category });
});

// desc = upDate Category
// route = PUT  /api/v1/categories/id
// access Privet

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`Not Category For This id:${id}`, 404));
  }
  res
    .status(200)
    .send({ status: true, massage: "This Item Is Deleted Successfully" });
});
