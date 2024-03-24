'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jhon',
        lastName: 'Smith',
        email: 'armensmith0@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Johnson',
        email: 'johnjohnson1@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Emma',
        lastName: 'Williams',
        email: 'emmawilliams2@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Michael',
        lastName: 'Jones',
        email: 'michaeljones3@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sophia',
        lastName: 'Brown',
        email: 'sophiabrown4@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'David',
        lastName: 'Davis',
        email: 'daviddavis5@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Olivia',
        lastName: 'Miller',
        email: 'oliviamiller6@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Daniel',
        lastName: 'Wilson',
        email: 'danielwilson7@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Isabella',
        lastName: 'Moore',
        email: 'isabellamoore8@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'James',
        lastName: 'Taylor',
        email: 'jamestaylor9@example.com',
        password: '121212',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      where: {
        id: {
          [Op.gt]: 0
        }
      }
    });
  }
};
