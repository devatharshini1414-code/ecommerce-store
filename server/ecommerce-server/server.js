require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const adminAnalyticsRoutes =
  require(
    "./routes/adminAnalyticsRoutes"
  );
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes =
require("./routes/orderRoutes");
const reviewRoutes =
require(
"./routes/reviewRoutes"
);
const analyticsRoutes =
require(
"./routes/analyticsRoutes"
);
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(
  "/api/admin",
  adminAnalyticsRoutes
);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
"/api/analytics",
analyticsRoutes
);
app.use(
"/api/reviews",
reviewRoutes
);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});