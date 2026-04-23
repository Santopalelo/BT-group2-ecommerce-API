const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/products", require("./routes/product.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/admin", require("./routes/admin.route"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));