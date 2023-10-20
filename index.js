const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

const productController = require("./controllers/product");

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  const keyword = req.query.name;

  if (keyword) {
    productController
      .getProductsByName(keyword)
      .then((data) => res.json(data))
      .catch((err) => res.status(err.status || 500).json(err));
  } else {
    productController
      .getAllProducts()
      .then((data) => res.json(data))
      .catch((err) => res.status(err.status || 500).json(err));
  }
});

app.get("/api/products/:id", (req, res) => {
  productController
    .getProductById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(err.status || 500).json(err));
});
app.post("/api/products", (req, res) => {
  productController
    .createProduct(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(err.status || 500).json(err));
});
app.put("/api/products/:id", (req, res) => {
  productController
    .updateProduct(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(err.status || 500).json(err));
});
app.delete("/api/products/:id", (req, res) => {
  productController
    .deleteProduct(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(err.status || 500).json(err));
});
app.delete("/api/products", (req, res) => {
  productController
    .deleteAllProducts()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(err.status || 500).json(err));
});

// 404
app.use((req, res, next) => {
  res.status(404).json({ status: 404, error: "Route not found" });
});

// error route
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: 500, error: "Internal Server Error" });
});

const connectionString =
  "mongodb+srv://mongodb:4Root_Pass123@cluster0.rpwst0b.mongodb.net/Marketplace?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
