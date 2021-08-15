const { Router } = require('express');

const router = Router();

router.get('/', (req, resp) => {
    resp.render('about', {
        title: 'News page',
        isAbout: true
    })
})

module.exports = router;