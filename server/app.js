const express = require('express');
const app = express();

const routes = require('./routes');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./db');

const cors = require('cors');
const http = require('http').Server(app);

const sockets = require('./socket/sockets');
const io = require('socket.io')(http);


const PORT = 3001;

// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());

// App routes
app.use('/', routes);

// setup Socket
sockets.connect(io);

// Connect to MongoDB before starting the Express server
connectToMongoDB()
  .then((mongoClient) => {
    // Listen for incoming requests only after successfully connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

