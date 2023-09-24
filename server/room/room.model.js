const {Schema, model} = require('mongoose')

const RoomModel = {
    name: {
        required: true,
        type: String,
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
}

module.exports = model( 'Room', new Schema(RoomModel));
