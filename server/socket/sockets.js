module.exports = {
  connect: function (io) {
    const chat = io.of('/');

    chat.on('connection', (socket) => {
      console.log('User connected');

      socket.on('message', (message) => {
        console.log('Received message:', message);
        chat.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
};
