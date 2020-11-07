'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', [{
       name: 'SEED',
       email: 'seed@gmail.com',
       password: '12345',
       storeName: 'testeseeders',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
