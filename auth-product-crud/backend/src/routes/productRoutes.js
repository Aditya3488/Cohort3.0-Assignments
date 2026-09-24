const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} = require("../middlewares/validators/productValidators");

const handleValidationErrors = require("../middlewares/handleValidationErrors");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, createProductValidator, handleValidationErrors, createProduct);
router.get("/", getProducts);
router.get("/:id", productIdValidator, handleValidationErrors, getProductById);
router.put("/:id", authenticate, productIdValidator, updateProductValidator, handleValidationErrors, updateProduct);
router.delete("/:id", authenticate, productIdValidator, handleValidationErrors, deleteProduct);

module.exports = router;