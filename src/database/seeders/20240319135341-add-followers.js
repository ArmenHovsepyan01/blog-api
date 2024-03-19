'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Followers', [
      {
        followerId: 2,
        followingId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 2,
        followingId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 10,
        followingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 10,
        followingId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Followers', {
      where: {
        id: {
          [Op.gt]: 0
        }
      }
    });
  }
};
