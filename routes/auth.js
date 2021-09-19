const { Router } = require('express')
const router = Router()
const User = require('../models/user')

router.get('/login', async(req, resp) => {
    resp.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    })
})

router.post('/register', async(req, resp) => {

})

router.post('/login', async(req, resp) => {
    const user = await User.findById('6130f0a53fdbd75dfb0be690');
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(() => {
        resp.redirect('/')
    })
})

router.get('/logout', async(req, resp) => {
    req.session.destroy(() => {
        resp.redirect('/auth/login#login')
    })
})

module.exports = router