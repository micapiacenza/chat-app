const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToMongoDB = require('./db');

const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./sockets');

const PORT = 3001;

// Use CORS middleware
app.use(cors());

// setup Socket
sockets.connect(io);

// Start server listening for requests
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
