const { Router } = require('express');
const Contact = require('../models/contact')

const router = Router();

router.get('/', (req, resp) => {
    resp.render('index', {
        title: 'Info page',
        isInfo: true
    })
})

router.post('/', async(req, resp) => { // Listen forms
    const contact = new Contact(req.body.name, req.body.photo, req.body.email)
    contact.save()

    resp.redirect('/shop') // Method for redirect
})

module.exports = router;