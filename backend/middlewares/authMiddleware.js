const jwt = require('jsonwebtoken'); // imports jsonwebtoken for token verification

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // gets the token from the authorization header
        
        // the token was created using the secret key and the user Id, so we can decode it
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // decodes the token using the secret key

        req.body = req.body || {}; // ensures req.body is never undefined
        req.body.userId = decodedToken.userId;

        next(); // calls the next middleware or route.
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        });
    }
}