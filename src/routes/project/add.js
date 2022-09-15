const Project = require("models/project");
const connectDB = require("middleware/mongodb");
const express = require("express");

const router = express.Router();

const handler = async (req, res) => {
  console.log(req.body);
  const { uid, projectName } = req.body;

  if (!uid) {
    return res.json({ message: "uid is empty", err: 1 });
  }

  if (!projectName) {
    return res.json({ message: "projectName is empty", err: 1 });
  }

  const projectDoc = await Project.findOne({ uid, projectName }).exec();
  if (projectDoc) {
    return res.json({ message: "project already exists", err: 2 });
  } else {
    Project.create({ uid, name: projectName }, (err, project) => {
      if (err) {
        return res.json({ message: err, err: 3 });
      }

      return res.json({ message: JSON.stringify(project), err: 0 });
    });
  }
};

router.post("/", connectDB(handler));

module.exports = router;
