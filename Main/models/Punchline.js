const { Schema, model, Types } = require('mongoose');
const date = new Date;


const punchlineSchema = new Schema({
    punchlineId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    punchlineBody: {
        type: String,
        required: true,
        max: [280, 'Punchline to long to read!']    
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: date.toDateString()
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = punchlineSchema;