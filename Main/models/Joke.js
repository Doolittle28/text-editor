const { Schema, model } = require('mongoose');
const punchlineSchema = require('./Punchline');
const date = new Date;

const JokeSchema = new Schema({
    joke: {
        type: String,
        required: true,
        min: 1,
        max: [280, 'Joke to short!']    
    },
    createdAt: {
        type: Date,
        default: date.toDateString()
    },
    username: {
        type: String,
        required: true
    },
    punchline: [punchlineSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

JokeSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Joke = model('Joke', JokeSchema)



module.exports = Joke;
