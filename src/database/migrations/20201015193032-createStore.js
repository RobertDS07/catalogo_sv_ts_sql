'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      storeNameToLink: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: '^[a-zA-Z0-9_]+$',
            msg: 'Nome deve ser sem espaços!'
          }
        }
      },
      logoLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instaLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      insta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whats: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsLinkToMsg: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stores');
  }
};
