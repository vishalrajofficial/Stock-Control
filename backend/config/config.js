const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const config = {
  // Database Configuration
  database: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/stock_control_db",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "fallback_jwt_secret_change_in_production",
    expiresIn: process.env.JWT_EXPIRE || "30d",
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },

  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME || "Stock Control App",
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // CORS Configuration
  cors: {
    origin: process.env.FRONTEND_URL || "https://stock-control-omega.vercel.app",
    credentials: true,
  },

  // File Upload Configuration
  upload: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    path: process.env.UPLOAD_PATH || "./uploads",
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  },

  // Rate Limiting Configuration
  rateLimit: {
    windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  },

  // Security Configuration
  security: {
    sessionSecret: process.env.SESSION_SECRET || "fallback_session_secret_change_in_production",
    bcryptRounds: 12,
  },
};

// Validation function to check required environment variables
const validateConfig = () => {
  const requiredVars = [];
  
  if (!process.env.MONGO_URI) requiredVars.push("MONGO_URI");
  if (!process.env.JWT_SECRET) requiredVars.push("JWT_SECRET");
  
  if (requiredVars.length > 0) {
    console.error("Missing required environment variables:", requiredVars.join(", "));
    console.error("Please check your .env file and ensure all required variables are set.");
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

// Validate configuration on load
validateConfig();

module.exports = config; 