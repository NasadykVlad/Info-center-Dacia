const { Router } = require('express');
const Contact = require('../models/contact')

const router = Router();

router.get('/', async(req, resp) => {
    const contacts = await Contact.getAll()
    resp.render('contacts', {
        title: 'Contacts page',
        isContact: true,
        contacts
    })
})

router.get('/:id', async(req, resp) => {
    const contact = await Contact.getById(req.params.id)
    resp.render('contact', {
        layout: 'empty',
        title: 'Course title',
        contact
    })
})

module.exports = router;