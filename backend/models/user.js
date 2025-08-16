const mongoose = require('mongoose'); // imports mongoose for MongoDB modelling

const userSchema = new mongoose.Schema({ // defines schema for user
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false, // so password isn't exposed when fetched
        minlength: 8 // password must be at least 8 characters
    },
    profilePicture: {
        type: String,
        required: false
    }
}, {timestamps: true}) // adds timestamps for created and updated fields

module.exports = mongoose.model('users', userSchema); // exports the user model based on the schema