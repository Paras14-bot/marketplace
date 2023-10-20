const Product = require("../models/product");

// Create a new product
exports.createProduct = async (productData) => {
  return new Promise((resolve, reject) => {
    const newProduct = new Product({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      category: productData.category,
    });

    newProduct
      .save()
      .then((product) => resolve(product))
      .catch(() => reject({ status: 500, error: "unable to add product" }));
  });
};

// Get  all products
exports.getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    Product.find()
      .then((products) => {
        if (products.length > 0) {
          resolve(products);
        } else {
          reject({ status: 404, error: "Products not found" });
        }
      })
      .catch(() => {
        reject({ status: 500, error: "Unable to get products" });
      });
  });
};

// Get product by id
exports.getProductById = async (productId) => {
  return new Promise((resolve, reject) => {
    Product.findById(productId)
      .then((product) => {
        if (!product) {
          reject({ status: 404, error: "Product not found" });
        } else {
          resolve(product);
        }
      })
      .catch(() => reject({ status: 500, error: "unable to get product" }));
  });
};

// Get products by name
exports.getProductsByName = async (keyword) => {
  return new Promise((resolve, reject) => {
    Product.find({
      name: { $regex: keyword, $options: "i" },
    })
      .then((products) => {
        if (products.length === 0) {
          reject({ status: 404, error: "no products found" });
        } else {
          resolve(products);
        }
      })
      .catch((err) => {
        console.log(err);
        reject({ status: 500, error: "unable to get products by name" });
      });
  });
};

// Update a product by ID
exports.updateProduct = async (productId, productData) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(productId, productData, { new: true })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          reject({ status: 404, error: "Product not found" });
        } else {
          resolve(updatedProduct);
        }
      })
      .catch(() => reject({ status: 500, error: "unable to update product" }));
  });
};

// Delete a product by ID
exports.deleteProduct = async (productId) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndRemove(productId)
      .then((deletedProduct) => {
        if (!deletedProduct) {
          reject({ status: 404, error: "Product not found" });
        } else {
          resolve("product deleted");
        }
      })
      .catch(() => reject({ status: 500, error: "unable to delete product" }));
  });
};

// Delete all products
exports.deleteAllProducts = async () => {
  return new Promise((resolve, reject) => {
    Product.deleteMany({})
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject({ status: 500, error: "unable to delete products" });
      });
  });
};
