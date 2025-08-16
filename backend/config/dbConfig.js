const mongoose = require('mongoose'); // imports mongoose for MongoDB interaction

mongoose.connect(process.env.CONN_STRING); // connects to mongoDB using connection string

// connection state
const db = mongoose.connection; // gets the default connections

// check the connection state
db.on('connected', () => {
    console.log("MongoDB connection successful");
})

db.on('error', (err) => {
    console.log("MongoDB connection error: " + err);
})

module.exports = db; // exports the connection object