require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const app = express();

// routers
const productRouter = require("./routes/products");
const supplierRouter = require("./routes/supplier");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customer");
const authRouter = require("./routes/auth");

// middleware
app.use(cors());
app.use(express.json());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/inventory", inventoryRoutes);

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// db
const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
