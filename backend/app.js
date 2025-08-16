const express = require('express'); // imports express
const app = express(); // creates an instance of express
const authRouter = require('./controllers/authController'); // imports the auth controller
const userRouter = require('./controllers/userController'); // imports the user controller
const chatRouter = require('./controllers/chatController'); // imports the chat controller
const messageRouter = require('./controllers/messageController');

// use the controller routes
app.use(express.json()); // parser for JSON bodies (JSON to JS)
app.use('/api/auth', authRouter); // sets up the auth routes as /api/auth
app.use('/api/user', userRouter); // sets up the user routes as /api/user
app.use('/api/chat', chatRouter); // sets up the chat routes as /api/chat
app.use('/api/message', messageRouter); // sets up the message routes as /api/message

module.exports = app; // exports the app object