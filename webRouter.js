const express = require("express")
const app = express()
const {user_game, user_biodata} = require("./models")

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/login", (req, res) => {
    user_game.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(user_game => {
        res.redirect("/dashboard")
    }).catch(error => {
        res.send(404).send("User Not Found")
    })
})

app.get("/dashboard", (req, res) => {
    user_biodata.findALL()
    .then(user_biodata => {
        res.render("dashboard/index", {user_biodata})
    })
})

app.get("/dashboard/create", (req, res) => {
    res.render("/dashboard/create")
})

app.post("/dashboard/create", (req, res) => {
    user_biodata.create({
        user_game_id: req.body.user_game_id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        hobby: req.body.hobby,
        birthday: req.body.birthday,
        birthplace: req.body.birthplace,
        nationality: req.body.nationality
    })
    .then(user_biodata => {
        res.redirect("/dashboard")
    })
    .catch(error => {
        res.status(433).send("Input Was Error")
    })
})

app.get("/dashboard/update/:id", (req, res) => {
    user_biodata.findOne({
        where: {id: req.params.id}
    })
    .then(user_biodata => {
        res.render('dashboard/update', {user_biodata})
    })
})

app.post("/dashboard/update/:id", (req, res) => {
    const query = {
        where: {id: req.params.id}
    }
    user_biodata.update({
        user_game_id: req.body.user_game_id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        hobby: req.body.hobby,
        birthday: req.body.birthday,
        birthplace: req.body.birthplace,
        nationality: req.body.nationality
    }, query)
    .then(() => {
        res.redirect("dashboard")
    })
    .catch(error => {
        res.status(433).send("Update Was Error")
    })
})

app.get("/dashboard/delete/:id", (req, res) => {
    user_biodata.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect("/dashboard")
    })
    .catch(error => {
        res.status(433).send("Deletions Was Error")
    })
})

module.exports = app