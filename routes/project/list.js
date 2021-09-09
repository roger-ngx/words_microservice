const Project = require("models/project");
const connectDB = require("middleware/mongodb");
const express = require('express');
const map = require('lodash/map');

const router = express.Router();

const handler = async(req, res) => {
    console.log(req.body);
    const { uid } = req.body;

    if(!uid){
        return res.json({message: 'uid is empty', err: 1});
    }

    const projects = await Project.find({uid}).exec();

    const names = map(projects, project => project.name);

    return res.json({names, err: 0});
};

router.post('/', connectDB(handler));

module.exports = router;