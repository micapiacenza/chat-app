const UserModel = require('./user.model');

const put_user = async (email, username, role, pwd) => {
    return await UserModel.create({email, username, role, pwd});
};

const list_users = () => {
    return UserModel.find()
};

const get_user = (id) => {
    return UserModel.findById(id);
};

const delete_user = (id) => {
    return UserModel.findByIdAndRemove(id);
};

const assign_role_to_user = (id, role) => {
    return UserModel.findByIdAndUpdate(id, {role}, {new: true})
};

const upgradeUserToSuperAdmin = async (userId) => {
  try {
    // Check if the user exists and update their role to Super Admin
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role: 'Super Admin' },
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
    put_user,
    get_user,
    list_users,
    assign_role_to_user,
    delete_user,
    upgradeUserToSuperAdmin
}
