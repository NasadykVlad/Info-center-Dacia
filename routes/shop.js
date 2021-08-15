const { Router } = require('express');

const router = Router();

router.get('/', (req, resp) => {
    resp.render('shop', {
        title: 'Shop page',
        isShop: true
    })
})

module.exports = router;