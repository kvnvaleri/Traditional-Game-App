const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const {users} = require("../models")

async function authenticate(username, password, done) {
    try {
        const user = await users.authenticate({username, password})
        return done(null, user)
    } catch (err) {
        return done(null, false, {message: err.message})
    }
}

passport.use(
    new localStrategy({usernameField: 'username', passwordField: 'password'}, authenticate)
)

passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async (id, done) => done(null, await users.findByPk(id))
)

module.exports = passport