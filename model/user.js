const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role:{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows non google users
    }
});

module.exports = mongoose.model('User', UserSchema);