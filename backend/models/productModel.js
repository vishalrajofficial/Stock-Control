const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    sku: {
      type: String,
      required: [true, "Please add a SKU"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9-_]+$/, "SKU can only contain uppercase letters, numbers, hyphens, and underscores"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
      maxLength: [100, "Category name cannot exceed 100 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number"
      }
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: function(value) {
          return Number.isFinite(value) && value >= 0;
        },
        message: "Price must be a valid positive number"
      }
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: Object,
      default: {},
    },
    // Additional useful fields for inventory management
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, "Low stock threshold cannot be negative"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
productSchema.index({ user: 1, sku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: "text", description: "text" });

// Virtual field to check if product is low in stock
productSchema.virtual("isLowStock").get(function() {
  return this.quantity <= this.lowStockThreshold;
});

// Ensure virtual fields are serialized
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
