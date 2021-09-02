const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            count: {
                type: Number,
                required: true,
                default: 1
            },
            courseID: {
                type: Schema.Types.ObjectId,
                ref: 'Contact',
                required: true
            }
        }]
    }
})

module.exports = model('User', userSchema);