'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fight.init({
    room_id: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
    user_choice: DataTypes.CHAR,
    user_id_p1: DataTypes.INTEGER,
    user_id_p2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fight',
  });
  return fight;
};