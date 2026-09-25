const express = require("express");
const cors = require("cors");
const authRoutes = require("./Features/Auth/auth.routes");
const profileRoutes = require("./Features/Profile/profile.routes.js");
const productRoutes = require("./Features/Product/Product.routes.js");
const productReviewRoutes = require("./Features/Product_Reviews/Product_Reviews.routes.js");
const wishlistRoutes = require("./Features/Wishlists/wishlist.routes.js");
const CartRoutes = require("./Features/Cart_items/Cart_items.routes.js");
const OrdersRoute = require("./Features/Orders/Order.routes.js");
const HomeRoutes = require("./Features/Home/Home.routes");
const contactRoutes = require("./features/contact/contact.routes");
const AdminRoutes = require("./Features/Admin/Admin.routes.js");
const app = express();
const path = require("path");

// Enable CORS for cross-origin client requests
app.use(cors());

// Parse incoming JSON request payloads
app.use(express.json());

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Mount user profile routes
app.use("/api/profile", profileRoutes);

// Mount product catalog routes
app.use("/api/products", productRoutes);

// Mount product reviews routes
app.use("/api/reviews", productReviewRoutes);

// Mount user wishlist routes
app.use("/api/wishlist", wishlistRoutes);

// Mount user shopping cart routes
app.use("/api/cart", CartRoutes);

// Mount user orders routes
app.use("/api/orders", OrdersRoute);

// Mount home page content routes
app.use("/api/home", HomeRoutes);

// Mount contact form submission routes
app.use("/api/contact", contactRoutes);

// Mount administrative panel routes
app.use("/api/admin", AdminRoutes);

// Serve uploaded static media files
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Export configured Express application
module.exports = app;
