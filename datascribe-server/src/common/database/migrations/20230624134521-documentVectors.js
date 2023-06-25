'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('documentVectors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      docId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vectorId: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: { type: Sequelize.DATE, default: new Date() },
      updatedAt: { type: Sequelize.DATE, default: new Date() },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documentVectors');
  },
};
