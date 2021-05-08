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
    if(userDoc){
        return res.json({message: 'username already exists', err: 2});
    } else {
        User.create({name: username}, (err, user) => {
            if(err){
                return res.json({message: err, err: 3});
            }

            return res.json({message: JSON.stringify(user), err: 0});
        });
    }
};

router.post('/', connectDB(handler));

module.exports = router;