exports.index = (req, res) => {
    const title = "Project Chapter 7"
    const subTitle = "Welcome"

    res.render("index", {title, subTitle})
}