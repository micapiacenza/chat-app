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


module.exports = {
    put_group,
    get_group,
    group_list,
    delete_group,
    get_rooms_in_group,
    get_users_in_room
}
