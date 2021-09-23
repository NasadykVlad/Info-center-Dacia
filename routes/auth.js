const { Router } = require('express')
const bcrypt = require('bcryptjs');
const router = Router()
const User = require('../models/user')

router.get('/login', async(req, resp) => {
    resp.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.post('/login', async(req, resp) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(() => {
                    resp.redirect('/')
                })
            } else {
                req.flash('loginError', 'Wrong password')
                resp.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'This user does not exist')
            resp.redirect('/auth/login#register')
        }

    } catch (err) {
        console.log(err)
    }

})

router.get('/logout', async(req, resp) => {
    req.session.destroy(() => {
        resp.redirect('/auth/login#login')
    })
})

router.post('/register', async(req, resp) => {
    try {
        const { email, password, repeat, name } = req.body;

        const candidate = await User.findOne({ email })

        if (candidate) {
            req.flash('registerError', 'User is registering')
            resp.redirect('/auth/login#register')
        } else {
            const hashPasword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                name,
                password: hashPasword,
                cart: {
                    items: []
                }
            })
            await user.save()
            resp.redirect('/auth/login#login')
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router