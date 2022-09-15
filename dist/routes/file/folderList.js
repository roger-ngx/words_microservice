"use strict";

var express = require('express');

var _require = require('fs'),
    lstatSync = _require.lstatSync,
    readdirSync = _require.readdirSync;

var path = require('path');

var router = express.Router();
var directoryPath = "".concat(path.resolve('./'), "/public/uploaded");

var isDirectory = function isDirectory(source) {
  return lstatSync(source).isDirectory();
};

var getDirectories = function getDirectories(source) {
  return readdirSync(source).map(function (name) {
    return join(source, name);
  }).filter(isDirectory);
};

router.post('/', function handler(req, res) {
  var username = req.body.username;
  var source = "".concat(directoryPath, "/").concat(username);
  var dirs = getDirectories(source);
  console.log(source, dirs);
  res.json(dirs);
});
module.exports = router;