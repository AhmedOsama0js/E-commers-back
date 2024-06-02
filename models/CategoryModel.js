// connect Database
const mongoose = require("mongoose");

// Schemas
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name Is Required"],
      unique: [true, "name Must Be Unique"],
      minlength: [3, "Too Short Must be more than 3 letters"],
      maxlength: [32, "Too Long Must be less than 32 letters"],
    },
    image: String,
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// model
const categoryModel = mongoose.model("Category", CategorySchema);

module.exports = categoryModel;
