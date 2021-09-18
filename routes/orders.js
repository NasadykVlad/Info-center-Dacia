const { Router } = require('express');
const Order = require('../models/order.js')
const router = Router()

router.get('/', async(req, resp) => {
    resp.render('orders', {
        isOrder: true,
        title: 'Orders'
    })
})

router.post('/', async(req, resp) => {
    resp.redirect('/orders')
})

module.exports = router