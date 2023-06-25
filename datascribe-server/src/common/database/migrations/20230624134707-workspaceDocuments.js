'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('workspaceDocuments', {
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
        unique: true,
      },
      filename: { type: Sequelize.TEXT, allowNull: false },
      docpath: { type: Sequelize.TEXT, allowNull: false },
      workspaceId: { type: Sequelize.INTEGER, allowNull: false },
      metadata: { type: Sequelize.TEXT, allowNull: false },
      createdAt: { type: Sequelize.DATE, default: new Date() },
      updatedAt: { type: Sequelize.DATE, default: new Date() },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workspaceDocuments');
  },
};
