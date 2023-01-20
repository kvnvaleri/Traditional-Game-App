const {users} = require("../models");
const passport = require("../lib/passport");

function format(user){
    const {id, username} = user
    return {
        id, 
        username,
        accessToken: user.generateToken()
    }
}

exports.login = (req,res) => {
    const title = "Login Dashboard"
    const subTitle = "Login Dashboard"
    res.render("auth/login", {title,subTitle})
}

exports.register = (req,res) => {
    const title = "User Registration"
    const subTitle = "User Registration"
    res.render("auth/register", {title,subTitle})
}

exports.registration = (req,res,next) => {          // post
    users.register(req.body)
        .then(() => {
            res.redirect("/auth/login")
        })
        .catch(err => next(err));
}

exports.doLogin = passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true
})

exports.restLogin = (req,res) => {
    users.authenticate(req.body)
    .then(users => {
        // res.json(users.id)
        res.status(200).json(format(users))
    })
}

exports.whoami = (req, res) => {
    const currentUser = req.user
    res.json(currentUser)
}

exports.restRegister = (req,res) => {
    users.registerApi(req.body)
    .then(users => {
        res.status(200).json(format(users))
    })
    .catch(error => {
        res.status(500).json(error)
    })
}