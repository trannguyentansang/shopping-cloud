const mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
    catName: String,
    catImage: String
});

const Category = mongoose.model('Category', catSchema, 'category')
module.exports = Category