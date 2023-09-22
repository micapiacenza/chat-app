const {Schema, model} = require('mongoose')

const GroupModel = {
    name: {
        required: true,
        type: String,
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'Room'
    }

}

module.exports = model( 'Group', new Schema(GroupModel));
