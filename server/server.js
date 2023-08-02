// Import the required modules.
const express = require('express');
const path = require('path');

// Create an instance of Express app.
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client/dist' directory.
app.use(express.static(path.join(__dirname, '../client/dist')));

// Parse incoming requests with URL-encoded and JSON data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use the HTML routes for the app.
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port.
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}.`));
