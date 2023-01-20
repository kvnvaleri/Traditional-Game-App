const {users} = require("../models")
const passport = require("../lib/passport")

exports.index = (req, res) => {
    const title = "Dashboard User Game"
    const subTitle = "Welcome Admin to Dashboard of User Game"
    const userData = req.user.dataValues

    res.render("web/dashboard", {title, subTitle, userData})
}

exports.about = (req, res) => {
    const title = "About Me"
    const subTitle = "Here is about me"
    res.render("web/about", {title,subTitle})
}