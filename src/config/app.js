const express = require("express");
const morgan = require("morgan");
const ErrorMiddleware = require("../app/middlewares/globals/error.middleware");
const apiRoutes = require("../routes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes api/v1/ panggil index
app.use("/api/v1", apiRoutes);

// Error Handling Middleware
app.use(ErrorMiddleware.handleNotFound);
app.use(ErrorMiddleware.handleError);

module.exports = app;
