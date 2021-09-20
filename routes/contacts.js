const { Router } = require('express');
const auth = require('../middleware/auth')

const router = Router();

router.get('/', auth, (req, resp) => {
    resp.render('contacts', {
        title: 'Contacts page',
        isContact: true
    })
})

module.exports = router;