require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const app = express();
const productRouter = require("./routes/products");

// extra security packages
=======
>>>>>>> bc36db28d424124dc822fad65393c20624f0f4ef
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  })
);
app.use(helmet());
<<<<<<< HEAD
app.use(express.json());
// routes
=======

const inventoryRoutes = require("./routes/inventory");
const authRouter = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/", inventoryRoutes);
>>>>>>> bc36db28d424124dc822fad65393c20624f0f4ef
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", productRouter);

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
