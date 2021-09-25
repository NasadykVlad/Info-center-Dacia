const keys = require('../keys')

module.exports = function(email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account register',
        html: `
        <h1>WELCOME!</h1>
        <p>You finish to account register from email - ${email}</p>
        <hr />
        <a href="${keys.BASE_URL}">Our Info-center Dacia</a>
        `
    }
}