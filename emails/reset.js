const keys = require('../keys')

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset password',
        html: `
        <h1>You forgot password.!</h1>
        <p>If not, ignore this message.</p>
        <p>Else, click the bottom link: </p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Restore password</a></p>
        <hr />
        <a href="${keys.BASE_URL}">Our Info-center Dacia</a>
        `
    }
}