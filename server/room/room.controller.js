const RoomModel = require('./room.model');
const UserModel = require('../user/user.model');

const put_room = async (name) => {
  try {
    return await RoomModel.create({ name });
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

const ban_user_from_channel_and_report = async (roomId, userId, adminUserId) => {
  try {
    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    // Check if the user exists and update the room to ban the user
    const user = await UserModel.findById(userId);
    if (user) {
      room.bannedUsers.push(userId);
      await room.save();
    }

    // Report the incident to Super Admins
    // TODO: need to implement the logic to notify Super Admins here

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
  ban_user_from_channel_and_report,
};
