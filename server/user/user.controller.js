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


module.exports = {
    put_user,
    get_user,
    list_users,
    assign_role_to_user,
    delete_user,
}
