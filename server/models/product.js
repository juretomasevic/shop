const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },

    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    grade: {
      type: Number,
    },
  },
  { collection: "products" }
);

const products = mongoose.model("Product", productSchema);
module.exports = products;
