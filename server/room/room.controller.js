const RoomModel = require('./room.model');
const UserModel = require('../user/user.model');
const GroupModel = require('../group/group.model');

const put_room = async (name, groupId, users = []) => {
  try {
    const createdRoom = await RoomModel.create({ name, groupId, users });

    await GroupModel.findByIdAndUpdate(groupId, {
      $push: { rooms: createdRoom._id },
    });

    return createdRoom;
  } catch (error) {
    throw error;
  }
};

const list_rooms = () => {
  return RoomModel.find();
};

const list_rooms_array = async () => {
  const rooms = await RoomModel.find().lean().exec();
  return rooms;
}

const get_room = (id) => {
  return RoomModel.findById(id);
};

const delete_room = (id) => {
  return RoomModel.findByIdAndRemove(id);
};

const add_message_to_room = async (roomId, senderId, content) => {
  try {
    const message = {
      sender: senderId,
      content,
    };

    // Add the file-upload to the room's messages array
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

module.exports = {
  put_room,
  list_rooms,
  get_room,
  delete_room,
  add_message_to_room,
  list_rooms_array
};
