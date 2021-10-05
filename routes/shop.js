const { Router } = require('express');
const Contact = require('../models/contact')
const auth = require('../middleware/auth');
const user = require('../models/user');

function isOwner(contact, req) {
    return contact.userId.toString() !== req.user._id.toString()
}

const router = Router();

router.get('/', async(req, resp) => {
    try {
        const contacts = await Contact.find()
            .populate('userId', 'email name')
            .select('name photo email')
        resp.render('shop', {
            title: 'Shop page',
            isShop: true,
            userId: req.user ? req.user._id.toString() : null,
            contacts
        })
    } catch (err) {
        console.log(err)
    }

})

router.get('/:id/edit', auth, async(req, resp) => {
    if (!req.query.allow) {
        return resp.redirect('/')
    }

    try {
        const contact = await Contact.findById(req.params.id)

        if (isOwner(contact, req)) {
            return resp.redirect('/shop')
        }

        resp.render('contact-edit', {
            title: 'Contact edit',
            contact
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', auth, async(req, resp) => {
    try {
        const { id } = req.body
        delete req.body.id
        const contact = await Contact.findById(id)

        if (isOwner(contact, req)) {
            return resp.redirect('/shop')
        }
        Object.assign(contact, req.body)
        await contact.save()
        await Contact.findByIdAndUpdate(id, req.body)
        resp.redirect('/shop')
    } catch (err) {
        console.log(err)
    }
})

router.post('/remove', auth, async(req, resp) => {
    try {
        await Contact.deleteOne({
            _id: req.body.id,
            userId: req.user._id
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