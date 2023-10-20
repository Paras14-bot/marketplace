const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  category: { type: String },
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
