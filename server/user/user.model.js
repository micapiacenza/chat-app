const {Schema, model} = require('mongoose')
const Roles = require('../roles/roles');

const UserModel = {
    username: {
        required: true,
        unique: true,
        type: String,
    },
    pwd: {
        required: true,
        type: String,
    },
    email: {
        unique: true,
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
        enum: Object.values(Roles),
    },
}

module.exports = model( 'User',new Schema(UserModel));
