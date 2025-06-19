const { body, param, query, validationResult } = require("express-validator");
const DOMPurify = require("isomorphic-dompurify");

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages
    });
  }
  next();
};

// Sanitize HTML content
const sanitizeHTML = (value) => {
  return DOMPurify.sanitize(value, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// User validation rules
const userValidationRules = {
  register: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces")
      .customSanitizer(sanitizeHTML),
    
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail()
      .customSanitizer(sanitizeHTML),
    
    body("password")
      .isLength({ min: 6, max: 128 })
      .withMessage("Password must be between 6 and 128 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number"),
    
    body("phone")
      .optional()
      .matches(/^\+?[\d\s\-\(\)]+$/)
      .withMessage("Please provide a valid phone number")
      .customSanitizer(sanitizeHTML),
    
    body("bio")
      .optional()
      .trim()
      .isLength({ max: 250 })
      .withMessage("Bio cannot exceed 250 characters")
      .customSanitizer(sanitizeHTML),
  ],

  login: [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail()
      .customSanitizer(sanitizeHTML),
    
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],

  updateProfile: [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces")
      .customSanitizer(sanitizeHTML),
    
    body("phone")
      .optional()
      .matches(/^\+?[\d\s\-\(\)]+$/)
      .withMessage("Please provide a valid phone number")
      .customSanitizer(sanitizeHTML),
    
    body("bio")
      .optional()
      .trim()
      .isLength({ max: 250 })
      .withMessage("Bio cannot exceed 250 characters")
      .customSanitizer(sanitizeHTML),
  ],
};

// Product validation rules
const productValidationRules = {
  create: [
    body("name")
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Product name must be between 1 and 200 characters")
      .customSanitizer(sanitizeHTML),
    
    body("sku")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("SKU must be between 1 and 50 characters")
      .matches(/^[A-Z0-9\-_]+$/i)
      .withMessage("SKU can only contain letters, numbers, hyphens, and underscores")
      .customSanitizer(sanitizeHTML),
    
    body("category")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Category must be between 1 and 100 characters")
      .customSanitizer(sanitizeHTML),
    
    body("quantity")
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer")
      .toInt(),
    
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a non-negative number")
      .toFloat(),
    
    body("description")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Description must be between 1 and 1000 characters")
      .customSanitizer(sanitizeHTML),
    
    body("lowStockThreshold")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Low stock threshold must be a non-negative integer")
      .toInt(),
    
    body("status")
      .optional()
      .isIn(["active", "inactive", "discontinued"])
      .withMessage("Status must be active, inactive, or discontinued"),
  ],

  update: [
    param("id")
      .isMongoId()
      .withMessage("Invalid product ID"),
    
    body("name")
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Product name must be between 1 and 200 characters")
      .customSanitizer(sanitizeHTML),
    
    body("sku")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("SKU must be between 1 and 50 characters")
      .matches(/^[A-Z0-9\-_]+$/i)
      .withMessage("SKU can only contain letters, numbers, hyphens, and underscores")
      .customSanitizer(sanitizeHTML),
    
    body("category")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Category must be between 1 and 100 characters")
      .customSanitizer(sanitizeHTML),
    
    body("quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer")
      .toInt(),
    
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a non-negative number")
      .toFloat(),
    
    body("description")
      .optional()
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Description must be between 1 and 1000 characters")
      .customSanitizer(sanitizeHTML),
    
    body("lowStockThreshold")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Low stock threshold must be a non-negative integer")
      .toInt(),
    
    body("status")
      .optional()
      .isIn(["active", "inactive", "discontinued"])
      .withMessage("Status must be active, inactive, or discontinued"),
  ],

  getById: [
    param("id")
      .isMongoId()
      .withMessage("Invalid product ID"),
  ],
};

// Contact validation rules
const contactValidationRules = {
  create: [
    body("subject")
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Subject must be between 1 and 200 characters")
      .customSanitizer(sanitizeHTML),
    
    body("message")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Message must be between 1 and 1000 characters")
      .customSanitizer(sanitizeHTML),
  ],
};

// Query validation rules
const queryValidationRules = {
  pagination: [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer")
      .toInt(),
    
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100")
      .toInt(),
  ],

  search: [
    query("search")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Search query cannot exceed 100 characters")
      .customSanitizer(sanitizeHTML),
    
    query("category")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage("Category filter cannot exceed 100 characters")
      .customSanitizer(sanitizeHTML),
  ],
};

module.exports = {
  handleValidationErrors,
  userValidationRules,
  productValidationRules,
  contactValidationRules,
  queryValidationRules,
}; 