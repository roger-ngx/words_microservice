const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    const { projectName, username, fileName } = req.body;

    console.log(req.body);

    try{
        const dir = `${path.resolve('./')}/public/uploaded/${username}/${projectName}`;
        if(fs.existsSync(dir)){
            fs.unlinkSync(`${dir}/${fileName}`);
        }
        return res.json({projectName, fileName, err: 0});

    }catch(ex){
        return res.json({message: 'server error: ' + JSON.parse(ex), err: 2});
    }
});

module.exports = router;