const express = require("express")
const app = express()
const fs = require('fs')
const port = 3000
const morgan = require("morgan")
const users = []
const webRouter = require("./webRouter.js")

let posts = require("./db/posts.json")

app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/api/v1/posts", (req, res) => {
    res.status(200).json(posts)
})

app.get("/api/v1/posts/:id", (req, res) => {
    const post = posts.find((i) => i.id == +req.params.id)
    res.status(200).json(post)
})

app.post("/api/v1/posts", (req, res) => {
    const { title, body } = req.body

    const id = posts[posts.length - 1].id + 1
    const post = {id, title, body}

    posts.push(post)
    fs.writeFileSync("./db/posts.json", JSON.stringify(posts))
    res.status(200).json(post)
})

app.put('/api/v1/posts/:id', (req, res) => {
    let post = posts.find((i) => i.id == +req.params.id)
    const params = { title: req.body.title, body: req.body.body}
    post = {...post, ...params}
    posts = posts.map(i => i.id == post.id ? post : i)
    fs.writeFileSync("./db/posts.json", JSON.stringify(posts))
    res.status(200).json(post)
})

app.delete('/api/v1/posts/:id', (req, res) => {
    posts = posts.filter(i => i.id != +req.params.id)
    fs.writeFileSync("./db/posts.json", JSON.stringify(posts))
    res.status(200).json({
        message: `Post dengan ID ${req.params.id} berhasil dihapus.`
    })
})

app.use('/Public/CSS/BinarChallange.css', express.static(__dirname + '/Public/CSS/BinarChallange.css'))
app.use('/Public/Image', express.static(__dirname + '/Public/Image'))
app.use('/Public/CSS/BinarChallange2.css', express.static(__dirname + '/Public/CSS/BinarChallange2.css'))
app.use('/Public/Javascript/BinarChallange2.js', express.static(__dirname + '/Public/Javascript/BinarChallange2.js'))

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(logger)

app.use(express.urlencoded({extended: false}))

app.use(morgan('dev'))

const router = require("./router.js")

app.get("/register", (req, res) => {
    res.status(200).send("Ini Halaman Register")
})

app.get("/iniError", (req, res) => {
    iniError
})

app.get("/home", (req, res) => {
    res.sendFile(__dirname +  '/Public/BinarChallange.html')
})

app.get("/greet", (req, res) => {
    const name = req.query.name || "no location"
    res.render('greet', {name, location})
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname +  '/Public/BinarChallange2.html')
})

app.get("/users", (req, res) => {
    res.send(`Jumlah User ${users.length}`)
})

app.use(webRouter)

app.use(router)

app.use(function(err, req, res, next){
    res.status(500).json({
        status: "failed",
        title: "page error",
        errors: err.message
    })
})

app.listen(port, () => {
    console.log("Server Ready on http://localhost"+port)
})