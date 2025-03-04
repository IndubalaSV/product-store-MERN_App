import Product from "../models/product.model.js";
import mongoose from "mongoose";

let createProduct = async (req, res) => {
  let product = req.body;
  //   console.log(req.body);
  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  console.log(product);
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let getProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
let updateProduct = async (req, res) => {
  let { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export { createProduct, deleteProduct, getProducts, updateProduct };
