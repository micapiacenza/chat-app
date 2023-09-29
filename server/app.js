const express = require('express');
const app = express();

const routes = require('./routes');
const connectToMongoDB = require('./db');

const cors = require('cors');
const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:4500',
    methods: ['GET', 'POST'],
  },
});

const sockets = require('./socket/sockets');

const PORT = 3001;

app.use(cors());
app.use(express.json());

// App routes
app.use('/', routes);

// setup Socket
sockets.connect(io);

// Connect to MongoDB before starting the Express server
connectToMongoDB()
  .then((mongoClient) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
