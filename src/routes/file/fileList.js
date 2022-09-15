const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const directoryPath = `${path.resolve("./")}/public/uploaded`;

router.post("/", function (req, res) {
  const { projectName, username } = req.body;
  console.log(req.body);

  if (!projectName || !username) {
    console.log({ err: "request body is empty" });
    return res.json({ err: "request body is empty" });
  }

  const dir = `${directoryPath}/${username}/${projectName}`;

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err);
      return res.json({ err });
    }

    console.log(files);

    return res.json({ files });
  });
});

module.exports = router;
