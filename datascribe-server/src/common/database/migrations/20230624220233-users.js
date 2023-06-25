'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0 - male, 1 - female, 2 - binary
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      token: {
        type: Sequelize.STRING(1234),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // true active
      },
      isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // true active
      },
      isEmailVerified: {
        type: Sequelize.INTEGER,
        defaultValue: 1, // 0 - pending, 1 - approved, 2 - reject
      },
      createdAt: { type: Sequelize.DATE, default: new Date() },
      updatedAt: { type: Sequelize.DATE, default: new Date() },
      deletedAt: { type: Sequelize.DATE, default: new Date(), allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
