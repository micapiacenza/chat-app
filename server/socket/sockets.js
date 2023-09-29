module.exports = {
  connect: function (io) {
    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    });
  }
};
