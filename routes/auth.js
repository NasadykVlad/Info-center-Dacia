const { Router } = require('express')
const router = Router()

router.get('/login', async(req, resp) => {
    resp.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    })
})

module.exports = router