module.exports = function(req, resp, next) {
    if (!req.session.isAuthenticated) {
        return resp.redirect('/auth/login#login')
    }

    next()
}