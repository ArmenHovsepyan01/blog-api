'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Armen',
        lastName: 'Hovsepyan',
        email: 'arh20025@gmail.com',
        password: '121212',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      where: {
        email: 'arh20025@gmail.com'
      }
    });
  }
};
