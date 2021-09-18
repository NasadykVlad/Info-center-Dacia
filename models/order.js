const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    contacts: [{
        contact: {
            type: Object,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
})

module.exports = model('Order', orderSchema)