const mongoose = require('mongoose');
const UserSchema = new mongoose.schema ({
    username: {
        type: String,
        required: true,
        unique: false
    },
    
    password: {
        type: String,
        required: true
    },

    role:
})