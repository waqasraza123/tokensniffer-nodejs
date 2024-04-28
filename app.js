const express = require('express');
const cors = require('cors');
const routes = require('./src/routes')

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());
app.use(routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
