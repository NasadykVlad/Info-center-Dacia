const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const router = Router()
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/user')
const keys = require('../keys')
const resetEmail = require('../emails/reset')
const reqEmail = require('../emails/registration');
const { isError } = require('util');

const transporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRID_API_KEY }
}))

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
            await transporter.sendMail(reqEmail(email))
            resp.redirect('/auth/login#login')
        }

    } catch (err) {
        console.log(err)
    }
})

router.get('/reset', (req, resp) => {
    resp.render('auth/reset', {
        title: 'Forgot Password',
        error: req.flash('error')
    })
})

router.post('/reset', (req, resp) => {
    try {
        crypto.randomBytes(32, async(err, buffer) => {
            if (err) {
                req.flash('error', 'Sorry, please try again later')
                return resp.redirect('/auth/reset')
            }
            const token = buffer.toString('hex')
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await transporter.sendMail(resetEmail(candidate.email, token))
                resp.redirect('/auth/login')
            } else {
                req.flash('error', 'There is no such email')
                resp.redirect('/auth/reset')
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/password/:token', async(req, resp) => {

    if (!req.params.token) {
        return resp.redirect('/auth/login')
    }
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() }
        })

        if (!user) {
            return resp.redirect('/auth/login')
        } else {
            resp.render('auth/password', {
                title: 'New passwrod',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/password', async(req, resp) => {
    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() }
        })

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 15)
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save()
            resp.redirect('/auth/login#login')
        } else {
            req.flash('loginError', 'Time token died')
            resp.redirect('/auth/login#login')
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router