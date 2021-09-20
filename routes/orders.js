const { Router } = require('express');
const Order = require('../models/order.js')
const router = Router()
const auth = require('../middleware/auth')

router.get('/', auth, async(req, resp) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId')

        resp.render('orders', {
            isOrder: true,
            title: 'Orders',
            orders: orders.map(o => {
                return {
                    ...o._doc
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/', auth, async(req, resp) => {
    try {
        const user = await req.user
            .populate('cart.items.contactID')

        const contacts = user.cart.items.map(i => ({
            count: i.count,
            contact: {...i.contactID._doc }
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            contacts: contacts
        })

        await order.save()
        await req.user.clearCart()

        resp.redirect('/orders')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router