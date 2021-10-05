const { Router } = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = Router()

router.get('/', auth, async(req, resp) => {
    resp.render('profile', {
        title: 'Profile',
        isProfile: true,
        user: req.user.toObject()
    })
})

router.post('/', auth, async(req, resp) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = {
            name: req.body.name
        }

        if (req.file) {
            toChange.avatarUrl = req.file.path
        }

        Object.assign(user, toChange)

        await user.save()
        resp.redirect('/profile')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router