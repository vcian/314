'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workspaceChats', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      prompt: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      response: { type: Sequelize.TEXT, allowNull: false },
      include: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      workspaceId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, default: new Date() },
      updatedAt: { type: Sequelize.DATE, default: new Date() },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workspaceChats');
  },
};
