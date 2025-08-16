const router = require('express').Router(); // imports express router
const bcrypt = require('bcryptjs'); // imports bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // imports jsonwebtoken for JWT handling
const User = require('./../models/User'); // double dot to go back "up" one directory. imports the user model

// POST: 
// async - "await" means it will wait for the repsonse before continuing

// signup route for the api
router.post('/signup', async (req, res) => { // req is the request object, res is the response object
    try {
        // checks if a user with this email already exists
        const user = await User.findOne({ email: req.body.email }) // checks if a user with this email exists

        // if user exists, send a message saying that it already exists
        if (user) {
            return res.status(400).send({
                message: 'User already exists',
                success: false
            })
        }

        // password encryption
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // hashes the password with a salt of 10 rounds

        req.body.password = hashedPassword; // replaced password in request body with hashed password

        // create user and save it to the database
        const newUser = new User(req.body);

        await newUser.save(); // saves user to the database

        res.status(201).send({
            message: 'User created successfully',
            success: true
        });

    } catch (error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});

// login route for the api
router.post('/login', async (req, res) => {
    try {
        // check if a user with this email exists
        const user = await User.findOne({ email: req.body.email }); 
        
        // checks if a user with this email exists
        if(!user) {
            return res.status(400).send({
                message: 'User does not exist',
                success: false
            })
        }

        // check if the password is correct
        const isValid = await bcrypt.compare(req.body.password, user.password);
        
        if(!isValid) {
            return res.status(400).send({
                message: 'Invalid password',
                success: false
            })
        }

        // if the user exists and password is correct, assign a JWT
        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});

        res.send({
            message: 'Login successful',
            success: true,
            token: token // send the token back to the client
        });

    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router; // exports the router