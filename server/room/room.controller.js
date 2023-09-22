const RoomModel = require('./room.model');

const put_room = async (email, username, role, pwd) => {
    return await RoomModel.create({name});
};

const list_rooms = () => {
    return RoomModel.find()
};

const get_room = (id) => {
    return RoomModel.findById(id);
};

const delete_room = (id) => {
    return RoomModel.findByIdAndRemove(id);
};

module.exports = {
    put_room,
    list_rooms,
    get_room,
    delete_room,
}
