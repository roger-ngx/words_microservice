const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const directoryPath = `${path.resolve('./')}/public/uploaded`;

router.post('/', function handler(req, res){

    const { projectName, username, fileName } = req.body;

    console.log(`${directoryPath}/${username}/${projectName}/${fileName}`);

    try{
        const file = fs.readFileSync(`${directoryPath}/${username}/${projectName}/${fileName}`);

        res.send(file);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;