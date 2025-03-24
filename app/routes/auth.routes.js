module.exports = (app) => {
  const { register, login } = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Register a new user
  router.post("/register", register);

  // User login
  router.post("/login", login);

  app.use("/api/auth", router);
};
