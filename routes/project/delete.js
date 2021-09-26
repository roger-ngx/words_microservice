const Project = require("models/project");
const connectDB = require("middleware/mongodb");
const express = require('express');

const fs = require('fs');
const path = require('path');

const router = express.Router();

const handler = async(req, res) => {
    const { uid, username, projectName } = req.body;

    console.log(req.body);

    if(!uid){
        return res.json({message: 'uid is empty', err: 1});
    }

    if(!projectName){
        return res.json({message: 'projectName is empty', err: 1});
    }

    try{
        const {deletedCount} = await Project.deleteOne({uid, name: projectName});

        console.log(deletedCount);
    
        if(deletedCount){
            const dir = `${path.resolve('./')}/public/uploaded/${username}/${projectName}`;
            if(fs.existsSync(dir)){
                fs.rmSync(dir, { recursive: true });
            }
            return res.json({name: projectName, err: 0});
        }

        return res.json({name: null, err: 0});

    }catch(ex){
        return res.json({message: 'server error: ' + JSON.parse(ex), err: 2});
    }
};

router.post('/', connectDB(handler));

module.exports = router;