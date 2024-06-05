const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name Is Required"],
      unique: [true, "name Must Be Unique"],
      minlength: [2, "Too Short Must be more than 2 letters"],
      maxlength: [32, "Too Long Must be less than 32 letters"],
    },
    image: String,
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory Most Be Belong To Parent Category"],
    },
  },
  { timestamps: true }
);


// model
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel;
