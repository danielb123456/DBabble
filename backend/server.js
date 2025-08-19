const dotenv = require('dotenv'); // imports dotenv for environment variables (user defined varialbes to determine running processes)
dotenv.config({path: './config.env'}); // loads environment variables from config.env

const dbconfig = require('./config/dbConfig.js'); // imports the dbConfig file to connect to the database

const app = require('./app.js'); // imports the app objects 

const port = process.env.PORT_NUMBER || 5000; // sets port from env variables (3000 default)

// gets program ready to listen on port 3000
app.listen(port, () => { // callback function when server starts
    console.log("Server is running on port " + port);
});