const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const connectDB = require("./db/database");

//Routes
const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

const port = process.env.PORT || 5000;

//JSON & CORS
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/app", appRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
}

//Middleware
connectDB();
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

//Error handling for shutting down the server
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to uncaught rejection ");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to unhandled promise rejection ");
  server.close(() => {
    process.exit(1);
  });
});
