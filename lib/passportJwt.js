const passport = require('passport')
const {Strategy: JwtStrategy,ExtractJwt } = require("passport-jwt")
const {users} = require("../models")
const env = require('dotenv').config()

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET_CODE
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    users.findByPk(payload.id)
    .then(user => done(null, user))
    .catch(err => done(null, err))
}))

module.exports = passport
