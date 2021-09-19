module.exports = function(req, resp, next) {
    resp.locals.isAuth = req.session.isAuthenticated

    next()
}