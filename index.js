const express = require("express");
require ("dotenv").config();
const connectDB = require("./config/database.js");
const cors = require('cors');
const errorHandler = require("./middleWare/errorHandler.js");
const requestLogger = require("./middleWare/logger.js");
const app = express();
const userRoute = require("./routes/user.routes.js") 
const productRoute = require("./routes/product.route.js") 

connectDB();

app.use(cors("*"));
app.use(express.json());
app.use(requestLogger);

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

  app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));