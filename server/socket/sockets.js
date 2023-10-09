const { list_rooms_array } = require('../room/room.controller');
const mongoose = require('mongoose');

module.exports = {
  connect: function (io) {
    var roomNames = [];
    let rooms = list_rooms_array().then((data) => {
      console.log('DATA!!!!', data);
      data.forEach((room) => {
        roomNames.push(room.name);
      });
      return roomNames;
    });
    const users = {};

    console.log('ROMS!!!!', rooms);
    let socketRoom = [];
    let socketRoomNum = []; // How may ppl in a group

    // io namespace
    const chat = io.of('/');

    chat.on('connection', (socket) => {
      console.log('User connected');

      socket.on('message', (message) => {
        console.log('Received message be:', message);

        for (let i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] === socket.id) {
            chat.to(socketRoom[i][1]).emit('message', message);
          }
        }
      });

      // Check new group creation existence
      socket.on('newRoom', (roomId) => {
        if (rooms.indexOf(roomId) === -1) {
          rooms.push(roomId);
          chat.emit('roomList', JSON.stringify(rooms));
        }
      });

      // Send list of current rooms
      socket.on('roomList', () => {
        chat.emit('groupList', JSON.stringify(rooms));
      });

      socket.on('joinRoom', (roomId) => {
        if (roomNames) {
          for (let i = 0; i < roomNames.length; i++) {
            console.log('comparison', roomNames[i] === roomId);
            console.log('ROOMS name', roomNames[i]);
            console.log('roomId ', roomId);

            if (roomNames[i] === roomId) {
              console.log('ROOMS id inside condition', roomNames[i]);

              // what it was inside join callback
              let alreadyInRoom = false;

              for (let i = 0; i < socketRoom.length; i++) {
                console.log('SOCKET ROOM in!!!', socketRoom);
                if (socketRoom[i][0] === socket.id) {
                  socketRoom[i][1] = roomId;
                  alreadyInRoom = true;
                }
              }

              console.log('alreadyInRoom', alreadyInRoom);
              if (!alreadyInRoom) {
                console.log('SOCKET ROOM out!!!', socketRoom);
                socketRoom.push([socket.id, roomId]);
                let hasRoomNum = false;

                for (let j = 0; j < socketRoomNum.length; j++) {
                  if (socketRoomNum[j][0] === roomId) {
                    socketRoomNum[j][1]++;
                    hasRoomNum = true;
                  }
                }

                if (!hasRoomNum) {
                  socketRoomNum.push([roomId, 1]);
                }
              }

              console.log('joining');
              chat.in(roomId).emit('notice', 'A new user has joined the room');
              socket.join(roomId);
              return chat.in(roomId).emit('joined', roomId);
            }
          }
        }
      });

      socket.on('leaveRoom', (roomId) => {
        for (let i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] === socket.id) {
            socketRoom.splice(i, 1);
            socket.leave(roomId);
            chat.io(roomId).emit('notice', 'A user has left the room');
          }
        }

        for (let j = 0; j < socketRoomNum.length; j++) {
          if (socketRoomNum[j][0] === roomId) {
            socketRoomNum[j][1]--;
            if (socketRoomNum[j][1] === 0) {
              socketRoomNum.splice(j, 1);
            }
          }
        }
      });

      socket.on('disconnect', () => {
        chat.emit('disconnect');
        for (let i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] === socket.id) {
            socketRoom.splice(i, 1);
          }
        }

        for (let j = 0; j < socketRoomNum.length; j++) {
            if (socketRoomNum[j][1] === socket.roomId) {
              socketRoomNum[j][1]--;
            }
        }
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    });
  }
};
