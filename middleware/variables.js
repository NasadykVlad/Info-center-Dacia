module.exports = function(req, resp, next) {
    resp.locals.isAuth = req.session.isAuthenticated
    resp.locals.csrf = req.csrfToken()
    next()
}