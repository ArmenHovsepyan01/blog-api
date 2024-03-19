import { Followers, User } from '../database/models/models';

async function getFollowers(id: number) {
  try {
    const data = await User.findAll({
      include: [
        {
          model: Followers,
          as: 'userFollowed',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followerId'] },
          include: [
            {
              attributes: ['id', 'firstName', 'lastName'],
              model: User,
              as: 'followingUser'
            }
          ]
        },
        {
          model: Followers,
          as: 'userFollowers',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'followerId'] },
          include: [
            {
              attributes: ['id', 'firstName'],
              model: User,
              as: 'followerUser'
            }
          ]
        }
      ]
    });

    return data;
  } catch (e) {
    throw e;
  }
}

export default {
  getFollowers
};
