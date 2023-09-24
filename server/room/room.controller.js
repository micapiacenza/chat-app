const RoomModel = require('./room.model');
const UserModel = require('../user/user.model');
const GroupModel = require('../group/group.model');

const put_room = async (name, groupId) => {
  try {
    const createdRoom = await RoomModel.create({ name, groupId });

    // Update the corresponding group document
    await GroupModel.findByIdAndUpdate(groupId, {
      $push: { rooms: createdRoom._id }
    });

    return createdRoom;
  } catch (error) {
    throw error;
  }
};


const list_rooms = () => {
  return RoomModel.find();
};

const get_room = (id) => {
  return RoomModel.findById(id);
};

const delete_room = (id) => {
  return RoomModel.findByIdAndRemove(id);
};

const get_users_room = async (roomId) => {
  try {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    const users = await UserModel.find({ _id: { $in: room.users } });

    return users;
  } catch (error) {
    throw error;
  }
};

const add_users_to_room = async (roomId, userIds) => {
  try {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    // Check if the users exist
    const users = await UserModel.find({ _id: { $in: userIds } });

    if (users.length !== userIds.length) {
      throw new Error('One or more users not found');
    }

    // Add the users to the room
    room.users.push(...userIds);
    await room.save();

    return room;
  } catch (error) {
    throw error;
  }
};

const remove_user_from_room = async (roomId, userId) => {
  try {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    // Remove the user from the room's users array
    room.users = room.users.filter((id) => id.toString() !== userId);

    await room.save();

    return room;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  put_room,
  list_rooms,
  get_room,
  delete_room,
  get_users_room,
  add_users_to_room,
  remove_user_from_room,
};
