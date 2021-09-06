const Project = require("models/project");
const connectDB = require("middleware/mongodb");
const express = require('express');

const router = express.Router();

const handler = async(req, res) => {
    console.log(req.body);
    const { uid, projectName } = req.body;

    if(!uid){
        return res.json({message: 'uid is empty', err: 1});
    }

    if(!projectName){
        return res.json({message: 'projectName is empty', err: 1});
    }

    const projects = await Project.find({uid}).exec();

    console.log(projects);
};

router.post('/list', connectDB(handler));

module.exports = router;