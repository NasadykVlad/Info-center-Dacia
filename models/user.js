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
            contactID: {
                type: Schema.Types.ObjectId,
                ref: 'Contact',
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function(contact) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.contactID.toString() === contact._id.toString()
    })

    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            contactID: contact._id,
            count: 1
        })
    }

    this.cart = { items }
    return this.save()
}

userSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.contactID.toString() === id.toString()
    })

    if (items[idx].count === 1) {
        items = items.filter(c => c.contactID.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = { items }
    return this.save()
}


module.exports = model('User', userSchema);