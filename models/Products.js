const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    name: {type: String, require:true },
    description: {type: String, require:true},
    type: {type: String },
    image: {type: String},
    price:{type: String}
})

module.exports = mongoose.model("Products", Products)