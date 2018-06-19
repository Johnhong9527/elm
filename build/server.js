"use strict";
const express = require("express");
const app = express();
const data = require("../data.json");
app.get("/data", function(req, res, next) {
  res.json(data);
});
app.listen(8888, function() {
  console.log("8888");
});
