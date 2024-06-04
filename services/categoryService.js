const slugify = require("slugify");
const categoryModel = require("../models/CategoryModel");
const { errorHandler } = require("../utils/errorHandler");
const { notFoundItem } = require("../utils/notFoundItem");

const mas = "Category";

// desc = Get list of All categories
// route =  GET  /api/v1/categories
// access = public

exports.getCategories = async (req, res) => {
  try {
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
  } catch (err) {
    return errorHandler(err, res);
  }
};

//  desc = get one category
// route = GET    /api/v1/categories:id
// access = public

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
      return notFoundItem(id, res, mas);
    }
    res.status(200).json({ status: true, data: category });
  } catch (err) {
    return errorHandler(err, res);
  }
};

// desc = Create Category
// route = POST  /api/v1/categories
// access Privet

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ status: true, data: category });
  } catch (err) {
    return errorHandler(err, res);
  }
};

// desc = upDate Category
// route = PUT  /api/v1/categories/id
// access Privet

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!category) {
      return notFoundItem(id, res, mas);
    }
    res.status(200).json({ status: true, data: category });
  } catch (err) {
    return errorHandler(err, res);
  }
};

// desc = upDate Category
// route = PUT  /api/v1/categories/id
// access Privet

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return notFoundItem(id, res, mas);
    }
    res
      .status(200)
      .send({ status: true, massage: "This Item Is Deleted Successfully" });
  } catch (err) {
    return errorHandler(err, res);
  }
};
