const passportJwt = require("../lib/passportJwt")
module.exports = passportJwt.authenticate('jwt', {
    session: false
})