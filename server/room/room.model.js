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
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
}

module.exports = model( 'Room', new Schema(RoomModel));
