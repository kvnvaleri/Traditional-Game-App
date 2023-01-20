'use strict';
const {
  Model
} = require('sequelize');
// const {rooms} = require('./rooms')
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * 
     * @param {room_id} room_id 
     * @param {round} round 
     * @returns user_id
     * 
     * Method ini dibuat untuk mencari siapa yang menang dalam 1 round, dalam 1 room 
     * Output yang dihasilkan adalah user_id pemenang
     */
    static async findWinner(room_id, round) {
      let result;
      let winner_id;
      await match.findAll({
        where: {
          room_id: room_id,
          round: round
        }
      }).then(matches => {
        result = matches
      }).catch(error => {
        console.log(error)
      });
      
      var player1 = result[0].user_id
      var player2 = result[1].user_id
      var player1_choice = result[0].choice
      var player2_choice = result[1].choice

      if (player1_choice == "R") {
        if (player2_choice == "P") {
          winner_id = player2
        }
        if (player2_choice == "S") {
          winner_id = player1
        }
        if (player2_choice == "R") {
          winner_id = 0
        }
      } else if (player1_choice == "P") {
        if (player2_choice == "P") {
          winner_id = 0
        }
        if (player2_choice == "S") {
          winner_id = player2
        }
        if (player2_choice == "R") {
          winner_id = player1
        }
      } else if (player1_choice == "S") {
        if (player2_choice == "P") {
          winner_id = player1
        }
        if (player2_choice == "S") {
          winner_id = 0
        }
        if (player2_choice == "R") {
          winner_id = player2
        }
      }

      return winner_id // user id yang menang 
    }
  }
  match.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
    choice: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'match',
  });
  return match;
};