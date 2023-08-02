// Import the required module.
const path = require('path');

// Export a function that sets up the HTML route.
module.exports = (app) => {
  // Handle GET requests to the root URL '/'.
  app.get('/', (req, res) => {
    // Send the 'index.html' file from the 'client/dist' directory as the response.
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};
