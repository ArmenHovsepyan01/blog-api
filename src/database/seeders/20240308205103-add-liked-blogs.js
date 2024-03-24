'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('LikedBlogs', [
      { userId: 1, blogId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, blogId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, blogId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, blogId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, blogId: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, blogId: 6, createdAt: new Date(), updatedAt: new Date() },
      { userId: 7, blogId: 7, createdAt: new Date(), updatedAt: new Date() },
      { userId: 8, blogId: 8, createdAt: new Date(), updatedAt: new Date() },
      { userId: 9, blogId: 9, createdAt: new Date(), updatedAt: new Date() },
      { userId: 10, blogId: 10, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LikedBlogs', {
      where: {
        id: {
          [Op.gt]: 0
        }
      }
    });
  }
};
