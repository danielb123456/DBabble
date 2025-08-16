const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    members: {
        type: [
            {type: mongoose.Schema.Types.ObjectId, ref: "users"} // array of users' IDs
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId, ref: "messages"
    },
    unreadMessageCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model("chats", chatSchema); // name of collection, schema