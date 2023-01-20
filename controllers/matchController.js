const {round, match, rooms, user_game_history} = require("../models")

exports.fight = async (req,res,next) => {
    const room_id = req.params.room_id                        
    const room = await rooms.findOne({where:{name:room_id}})
    let active_round = await round.get_active_round(room.id)
    console.log(room.id)
    if (active_round <= 3){
        const count = await match.count({
            where: {
                room_id: room.id,
                round: active_round
            },
        });
    
        if (count < 2) {
            const fight = await match.create({
                user_id: req.user.id,
                room_id: room.id,
                choice: req.body.choice,
                round: active_round
            })
            .then(async fight => {
                const winner_id = await match.findWinner(fight.room_id, fight.round)

                if (winner_id !== null || winner_id !== undefined) {
                    var record = await round.record_winner(fight.room_id, fight.round, winner_id)
                    const match_data = await match.findAll({where:{room_id: fight.room_id}})
                    if(winner_id == 0){
                        return res.status(200).json({
                            message: "We tie! Result is Draw!",
                            data: match_data
                        })
                    }else{
                        return res.status(200).json({
                            message: "User " + winner_id + " wins!",
                            data:match_data
                        })
                    }
                } else{
                    return res.status(200).json({
                        message: "Waiting for opponent"
                    })
                }
            })
            .catch(() => {
                return res.status(200).json({
                    message: "Waiting for opponent"
                })
            })
        } else {
            const winner_id = await match.findWinner(room.id, active_round)
            const record_winner = await round.record_winner(room.id, active_round, winner_id)
            return res.status(200).json(record_winner)
        }
    } else {
        var winner_of_this_room = await round.get_round_data(room.id)
        await user_game_history.score_record(winner_of_this_room)

        return res.status(200).json({
            message: "Game Over! Room " + room.name + " has 3 round matches"
        })
    }
}