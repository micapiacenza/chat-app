module.exports = {
  connect: function (io) {
    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });

      socket.on('leave-room', (roomId) => {
        socket.leave(roomId); // Leave the room
        console.log(`User left room: ${roomId}`);
      });

      // TODO: IMPLEMENT THE CODE BELOW PROPERLY SO THAT THE CHAT HAPPENS IN THE ROOM
      // socket.on('send-message', (roomId, message) => {
      //   io.to(roomId).emit('receive-message', message);
      //   console.log(`Message sent to room ${roomId}:`, message);

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
