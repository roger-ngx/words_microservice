const User = require("models/user");
const connectDB = require("middleware/mongodb");
const express = require('express');

const router = express.Router();

const handler = async(req, res) => {
    const { username } = req.body;

    console.log('username: ', username);

    if(!username){
        return res.json({message: 'username is empty', err: 1});
    }

    const userDoc = await User.findOne({name: username}).exec();
    // console.log(userDoc);
    if(userDoc){
        return res.json({message: 'username exists', uid: userDoc._id, err: 0});
    } else {
        return res.json({message: "username doesn't exists", err: 2});
    }
};

router.post('/', connectDB(handler));

module.exports = router;