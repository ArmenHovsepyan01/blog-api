'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [
      {
        title: 'My first blog',
        content: 'wlkejlwelwenlkwe lkwenlkdnlwed kl2nedlkn2ekdnd 2 2epodn2epdn2elkdnl2k3dn',
        imageUrl: '/blog.webp',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My second blog',
        content: 'wlkejlwelwenlkwe lkwenlkdnlwed kl2nedlkn2ekdnd 2 2epodn2epdn2elkdnl2k3dn',
        imageUrl: '/blog.webp',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My first blog',
        content: 'wlkejlwelwenlkwe lkwenlkdnlwed kl2nedlkn2ekdnd 2 2epodn2epdn2elkdnl2k3dn',
        imageUrl: '/blog.webp',
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My blog',
        content: 'wlkejlwelwenlkwe lkwenlkdnlwed kl2nedlkn2ekdnd 2 2epodn2epdn2elkdnl2k3dn',
        imageUrl: '/blog.webp',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My blog',
        content: 'wlkejlwelwenlkwe lkwenlkdnlwed kl2nedlkn2ekdnd 2 2epodn2epdn2elkdnl2k3dn',
        imageUrl: '/blog.webp',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', {
      where: {
        id: {
          [Op.gt]: 0
        }
      }
    });
  }
};
