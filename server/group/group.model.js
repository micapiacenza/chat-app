const {Schema, model} = require('mongoose')

const GroupModel = {
  name: {
    required: true,
    type: String,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bannedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
};


module.exports = model( 'Group', new Schema(GroupModel));
