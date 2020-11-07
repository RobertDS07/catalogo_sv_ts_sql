'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('stores', [{
       logoLink: 'https://i.imgur.com/z6f8zcm.png',
       instaLink: 'https://www.instagram.com/direto__do__closet/',
       insta: 'direto_do_closet',
       whats: ' 51 98942-4940',
       whatsLinkToMsg: 'https://api.whatsapp.com/send/?phone=5551989424940&text=Oii+&app_absent=0',
       storeNameToLink: 'testeseeders',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('stores', null, {});
  }
};
