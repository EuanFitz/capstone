const mongoose = require('mongoose');
require
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
    },
    displayName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        maxLength: 500,
        default: null
    },
    voiceCloneId: {
    type: String,
    default: null
    }
});

module.exports = mongoose.model('User', UserSchema);