const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');

function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.contactID._doc,
        count: c.count
    }))
}

router.post('/add', async(req, resp) => {
    const contact = await Contact.findById(req.body.id)
    await req.user.addToCart(contact)
    resp.redirect('/contacts')
})

router.delete('/remove/:id', async(req, resp) => {
    const card = await Card.remove(req.params.id)
    resp.status(200).json(card)
})

router.get('/', async(req, resp) => {
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