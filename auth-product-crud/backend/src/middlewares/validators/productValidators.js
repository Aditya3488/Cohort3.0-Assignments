const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const createProductValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("stock")
    .notEmpty().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be a positive integer"),

  body("description")
    .optional()
    .trim(),

  body("category")
    .optional()
    .trim(),
];

const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("Product name cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a positive integer"),
];

const productIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];

module.exports = { createProductValidator, updateProductValidator, productIdValidator };