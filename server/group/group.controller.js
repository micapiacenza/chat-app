const GroupModel = require('./group.model');
const RoomModel = require('../room/room.model');
const UserModel = require('../user/user.model');

const put_group = async (name, memberUserIds = []) => {
  try {
    const createdGroup = await GroupModel.create({ name });

    // Add users to the group
    await GroupModel.findByIdAndUpdate(createdGroup._id, {
      $addToSet: { members: { $each: memberUserIds } }
    });

    return createdGroup;
  } catch (error) {
    throw error;
  }
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

const join_group = async (groupId, userId) => {
  try {
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    if (!updatedGroup) {
      throw new Error('Group not found');
    }

    return updatedGroup;
  } catch (error) {
    throw error;
  }
};

// Leave a group
const leave_group = async (groupId, userId) => {
  try {
    // Remove the user from the group's members list
    await GroupModel.findByIdAndUpdate(groupId, {
      $pull: { members: userId }
    });

    // Remove the user from the rooms in the group
    const rooms = await get_rooms_in_group(groupId);
    const roomIds = rooms.map((room) => room._id);

    for (const roomId of roomIds) {
      await RoomModel.findByIdAndUpdate(roomId, {
        $pull: { users: userId }
      });
    }
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
    leave_group,
    join_group
}
