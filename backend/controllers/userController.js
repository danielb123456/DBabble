const router = require('express').Router(); // imports express router
const User = require('./../models/User'); // imports the User model
const authMiddleware = require('./../middlewares/authMiddleware'); // imports the authentication middleware

// get details of the current user (callback function)
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.body.userId }); // finds the user by ID from the request body

        res.send({
            message: 'User details fetched successfully',
            success: true,
            data: user
        });

    } catch (error) {
        res.status(400).send({
            error: error.message,
            success: false
        })
    }
});

// (authMiddleware makes sure that the call comes from an authenticated user)

// gets all users that are not the logged in user
router.get('/get-all-users', authMiddleware, async (req, res) => {
    try{
        const userid = req.body.userId;
        const allUsers = await User.find({_id: {$ne: userid}}); // "not equal to id of currently logged user"
        // unlike findOne, find can fetch multiple objects

        res.send({
            message: 'All users fetched successfully',
            success: true,
            data: allUsers
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router; // exports the router for use in other files.