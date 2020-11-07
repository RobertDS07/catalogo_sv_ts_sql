'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('products', [{
       storeName: 'testeseeders',
       fotourl: 'fotourl',
       name: 'name',
       price: 12,
       size: 'size',
       description: 'description',
       category: 'category',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      storeName: 'testeseeders',
      fotourl: 'fotourl',
      name: 'name',
      price: 12,
      size: 'size',
      description: 'description',
      category: 'category',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeName: 'testeseeders',
      fotourl: 'fotourl',
      name: 'name',
      price: 12,
      size: 'size',
      description: 'description',
      category: 'category',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeName: 'testeseeders',
      fotourl: 'fotourl',
      name: 'name',
      price: 12,
      size: 'size',
      description: 'description',
      category: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeName: 'testeseeders',
      fotourl: 'fotourl',
      name: 'name',
      price: 12,
      size: 'size',
      description: 'description',
      category: 'category',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('products', null, {});
  }
};
