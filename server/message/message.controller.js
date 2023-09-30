const RoomModel = require('../room/room.model');

const addMessageToRoom = async (roomId, senderId, content) => {
  try {
    const message = {
      sender: senderId,
      content,
    };

    // Add the message to the room's messages array
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      roomId,
      { $push: { messages: message } },
      { new: true }
    );

    return updatedRoom.messages;
  } catch (error) {
    throw error;
  }
};

const getRoomMessages = async (roomId) => {
  try {
    const room = await RoomModel.findById(roomId);
    return room.messages;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addMessageToRoom,
  getRoomMessages,
};
