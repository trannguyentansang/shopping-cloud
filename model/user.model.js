const mongoose = require('mongoose');
const Permission = require('./permission.model')
var userSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    email:String,
    phone: String,
    address: String,
    status: Boolean,
    permission: Permission,
    avatar: String,
    joined: String
});

const User = mongoose.model('User', userSchema, 'user')
module.exports = User