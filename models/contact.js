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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

contact.method('toClient', function() {
    const contact = this.toObject()

    contact.id = contact._id;

    delete contact._id

    return contact
})

module.exports = model('Contact', contact)