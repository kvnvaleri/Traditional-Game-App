'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_biodata.init({
    user_game_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    hobby: DataTypes.STRING,
    birthday: DataTypes.DATE,
    birthplace: DataTypes.STRING,
    nationality: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_biodata',
  });
  return user_biodata;
};