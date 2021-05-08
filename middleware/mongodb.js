const mongoose = require('mongoose');

// const MONGO_DB_URL = 'mongodb+srv://thanh:thanh@cluster0.61tgr.mongodb.net/words?retryWrites=true&w=majority';
const MONGO_DB_URL = 'mongodb://udp_db:27017/words';

const connectDB = handler => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    await mongoose.connect(MONGO_DB_URL, {
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useNewUrlParser: true
    });
    return handler(req, res);
};

module.exports = connectDB;