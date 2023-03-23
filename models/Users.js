const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: {type: String, require:true , maxLength:25},
    email: {type: String, require:true , maxLength:35},
    password: {type: String, require:true, maxLength:25},
})

module.exports = mongoose.model("Users", Users)