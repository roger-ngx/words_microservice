"use strict";

var express = require('express');

var path = require('path');

var fs = require('fs');

var router = express.Router();
var directoryPath = "".concat(path.resolve('./'), "/public/uploaded");
router.post('/', function (req, res) {
  var _req$body = req.body,
      projectName = _req$body.projectName,
      username = _req$body.username;
  console.log(req.body);

  if (!projectName || !username) {
    console.log({
      err: 'request body is empty'
    });
    return res.json({
      err: 'request body is empty'
    });
  }

  var dir = "".concat(directoryPath, "/").concat(username, "/").concat(projectName);
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err);
      return res.json({
        err: err
      });
    }

    console.log(files);
    return res.json({
      files: files
    });
  });
});
module.exports = router;