'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Followers', [
      { followerId: 1, followingId: 2, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 3, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 2, followingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 2, followingId: 4, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 3, followingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 3, followingId: 5, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 2, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 4, followingId: 6, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 5, followingId: 3, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 5, followingId: 7, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 6, followingId: 4, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 6, followingId: 8, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 7, followingId: 5, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 7, followingId: 9, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 8, followingId: 6, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 8, followingId: 10, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 9, followingId: 7, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 9, followingId: 1, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 10, followingId: 8, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 10, followingId: 2, createdAt: new Date(), updatedAt: new Date() }
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
