const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');
const auth = require('../middleware/auth')

function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.contactID._doc,
        id: c.contactID.id,
        count: c.count
    }))
}

router.post('/add', auth, async(req, resp) => {
    const contact = await Contact.findById(req.body.id)
    await req.user.addToCart(contact)
    resp.redirect('/shop')
})

router.delete('/remove/:id', auth, async(req, resp) => {
    await req.user.removeFromCart(req.params.id)

    const user = await req.user.populate('cart.items.contactID')
    const contacts = mapCartItems(user.cart)
    const cart = { contacts }

    resp.status(200).json(cart)
})

router.get('/', auth, async(req, resp) => {
    const user = await req.user
        .populate('cart.items.contactID')

    const contacts = mapCartItems(user.cart)

    resp.render('card', {
        title: 'Card',
        isCard: true,
        contacts: contacts
    })

})

module.exports = router