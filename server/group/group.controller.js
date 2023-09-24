const GroupModel = require('./group.model');
const RoomModel = require('../room/room.model');
const UserModel = require('../user/user.model');

const put_group = (name) => {
    return GroupModel.create({name});
};

const group_list = () => {
    return GroupModel.find();
};

const get_group = (id) => {
    return GroupModel.findById(id);
};

const delete_group = (id) => {
    return GroupModel.findByIdAndRemove(id);
};

const get_rooms_in_group = (id, rooms) => {
    GroupModel.findById(id);
    return GroupModel.find(rooms);
}

const get_users_in_room = (roomId, users) => {
    RoomModel.findById(roomId);
    UserModel.find(users);
    return GroupModel.findByIdAndUpdate(users)
}

const promote_user_to_GroupAdmin = async (userId) => {
  try {
    // Check if the user exists and update their role to Group Admin
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { roles: 'Group Admin' } }, // Add 'Group Admin' role
      { new: true } // Return the updated user
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};


module.exports = {
    put_group,
    get_group,
    group_list,
    delete_group,
    get_rooms_in_group,
    get_users_in_room,
    promote_user_to_GroupAdmin,
  // ban_user_from_group_and_report,
  // send_join_request,
}
