require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./routes/products");

// extra security packages
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

// connectDB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const auth = require("./middleware/authentication");

app.use(cors());
app.use(express.json());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(helmet());
app.use(express.json());
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
