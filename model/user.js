var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    image: String
})

var User = mongoose.model('user', userSchema);
module.exports = User;