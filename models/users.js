'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = ({username, password, name}) => {
      const encryptPassword = this.#encrypt(password);  // password -> string
      return this.create({username: username, password: encryptPassword, name: name});
    }
    checkPassword = password => bcrypt.compareSync(password, this.password);

    static authenticate = async ({username, password}) => {
      try {
        const user = await this.findOne({where: {username}})
        if (!user) return Promise.reject("User not Found!")
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Password is wrong")
        return Promise.resolve(user)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      const secret_key = process.env.JWT_SECRET_CODE
      const token = jwt.sign(payload, secret_key);

      this.update({
        access_token: token
      }, {where:{id: this.id}})
      .then(() => {
        true
      }).catch(err => {
        return err
      }) 

      return token
    }

    static registerApi = ({username, password, name}) => {
      const encryptPassword = this.#encrypt(password); 
      return this.create({username: username, password: encryptPassword, name: name, role: 'player'});
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    access_token: DataTypes.STRING,
    expired_at: DataTypes.DATE,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};