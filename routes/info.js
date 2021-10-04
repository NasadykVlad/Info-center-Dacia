const { Router } = require('express');
const { validationResult } = require('express-validator/check')
const Contact = require('../models/contact')
const auth = require('../middleware/auth')
const { contactValidators } = require('../utils/validators')


const router = Router();

router.get('/', (req, resp) => {
    resp.render('contacts', {
        title: 'Info page',
        isInfo: true
    })
})

router.post('/', auth, contactValidators, async(req, resp) => { // Listen forms
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return resp.status(422).render('contacts', {
            title: 'Info page',
            isInfo: true,
            error: errors.array()[0].msg,
            data: {
                name: req.body.name,
                photo: req.body.photo,
                email: req.body.email
            }
        })
    }

    const contact = new Contact({
        name: req.body.name,
        photo: req.body.photo,
        email: req.body.email,
        userId: req.user
    })

    try {
        await contact.save()
        resp.redirect('/contacts') // Method for redirect
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;