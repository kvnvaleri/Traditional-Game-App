const {rooms} = require("../models")

// exports.create = (req, res) => {
//     rooms.createRoom(req)
//     .then(room => {
//         res.status(200).json(room)
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// }

exports.create = (req,res) => {
    var name = Date.now();
    name = String(name);

    rooms.create({
        name:name
    })
    .then(rooms => {
        res.status(200).json(rooms)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}