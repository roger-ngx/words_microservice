"use strict";

var express = require('express');

var path = require('path');

var fs = require('fs');

var router = express.Router();
var directoryPath = "".concat(path.resolve('./'), "/public/uploaded");
router.post('/', function handler(req, res) {
  var _req$body = req.body,
      projectName = _req$body.projectName,
      username = _req$body.username,
      fileName = _req$body.fileName;
  console.log("".concat(directoryPath, "/").concat(username, "/").concat(projectName, "/").concat(fileName));

  try {
    var file = fs.readFileSync("".concat(directoryPath, "/").concat(username, "/").concat(projectName, "/").concat(fileName));
    res.send(file);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;