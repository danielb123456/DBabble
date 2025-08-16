const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const Chat = require('./../models/chat');
const Message = require('./../models/message');

router.post('/create-message', authMiddleware, async (req, res) => {
    try{
        // store message in message collection
        const newMessage = new Message(req.body); // newly created message
        const savedMessage = await newMessage.save(); // save it

        // update the last message in the chat collection
        const currentChat = await Chat.findOneAndUpdate({
            _id: req.body.chatId
        }, {
            lastMessage: savedMessage._id, 
            $inc: {unreadMessageCount: 1} // increments number of unread messages
        });

        res.status(201).send({
            message: 'Message sent successfully',
            success: true,
            data: savedMessage
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
})

router.get('/get-all-messages/:chatId', authMiddleware, async (req, res) => { // chat id is in the URL
    try{
        const allMessages = await Message.find({chatId: req.params.chatId}).sort({createdAt: 1}); // sort messages by time created

        res.send({
            message: 'Messages fetched successfully',
            success: true,
            data: allMessages
        })
    } catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;