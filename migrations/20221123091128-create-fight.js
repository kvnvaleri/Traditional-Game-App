'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER
      },
      round: {
        type: Sequelize.INTEGER
      },
      user_choice: {
        type: Sequelize.CHAR
      },
      user_id_p1: {
        type: Sequelize.INTEGER
      },
      user_id_p2: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fights');
  }
};