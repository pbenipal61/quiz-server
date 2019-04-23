const express = require("express");

const router = express.Router();

router.post("/fetch", (req, res, next) => {
  var vals = JSON.parse(Object.keys(req.body)[0]);
  console.log(vals);
  res.send({ message: "test route reached with data" });
});

module.exports = router;
