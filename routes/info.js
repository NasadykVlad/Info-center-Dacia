const { Router } = require('express');

const router = Router();

router.get('/', (req, resp) => {
    resp.render('index', {
        title: 'Info page',
        isInfo: true
    })
})

module.exports = router;