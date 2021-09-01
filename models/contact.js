const { Schema, model } = require('mongoose');


const contact = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = model('Contact', contact)