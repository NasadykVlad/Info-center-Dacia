const { body } = require('express-validator/check');
const User = require('../models/user')

exports.registerValidators = [
    body('email').isEmail().withMessage('Please input valid email!').custom(async(value, { req }) => {
        try {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('Email busy')
            }
        } catch (err) {
            console.log(err)
        }
    }),
    body('password', 'The password must be more than 6 characters and less than 56 and consist of Latin characters').isLength({ min: 6, max: 56 }).isAlphanumeric(),
    body('confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match')
        }
        return true
    }),
    body('name').isLength({ min: 3, max: 11 }).withMessage('Please input valid name!'),
]