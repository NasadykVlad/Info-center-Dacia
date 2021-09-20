const { Router } = require('express');
const Contact = require('../models/contact')
const auth = require('../middleware/auth')

const router = Router();

router.get('/', async(req, resp) => {
    const contacts = await Contact.find()
        .populate('userId', 'email name')
        .select('name photo email')
    resp.render('shop', {
        title: 'Shop page',
        isShop: true,
        contacts
    })
})

router.get('/:id/edit', auth, async(req, resp) => {
    if (!req.query.allow) {
        return resp.redirect('/')
    }

    const contact = await Contact.findById(req.params.id)

    resp.render('contact-edit', {
        title: 'Contact edit',
        contact
    })
})

router.post('/edit', auth, async(req, resp) => {
    const { id } = req.body
    delete req.body.id
    await Contact.findByIdAndUpdate(id, req.body)
    resp.redirect('/contacts')
})

router.post('/remove', auth, async(req, resp) => {
    try {
        await Contact.deleteOne({
            _id: req.body.id
        })
        resp.redirect('/contacts')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async(req, resp) => {
    try {
        const contact = await Contact.findById(req.params.id)

        resp.render('contact', {
            layout: 'empty',
            title: 'Course title',
            contact
        })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;