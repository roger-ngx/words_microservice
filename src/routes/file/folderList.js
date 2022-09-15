const express = require("express");
const { lstatSync, readdirSync } = require("fs");
const path = require("path");

const router = express.Router();
const directoryPath = `${path.resolve("./")}/public/uploaded`;

const isDirectory = (source) => lstatSync(source).isDirectory();

const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory);

router.post("/", function handler(req, res) {
  const { username } = req.body;

  const source = `${directoryPath}/${username}`;

  const dirs = getDirectories(source);

  console.log(source, dirs);

  res.json(dirs);
});

module.exports = router;
