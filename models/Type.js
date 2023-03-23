const mongoose = require('mongoose');

const Types = new mongoose.Schema({
    name:{ type:String, require:true , maxLenght:25}
})

module.exports = mongoose.model("Types", Types)