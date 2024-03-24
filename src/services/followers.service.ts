import { FollowerValues } from '../definitions';
import { CustomError } from '../errors/customError';

import { Followers } from '../database/models/models';

async function createFollower(values: FollowerValues) {
  try {
    if (!values.followingId) throw new CustomError('Please include whom you want to follow.', 400);

    if (values.userId === values.followingId)
      throw new CustomError("You can't follow yourself.", 400);

    const existingFollower = await Followers.findOne({
      where: {
        followingId: values.followingId,
        followerId: values.userId
      }
    });

    if (existingFollower) {
      return await deleteFollow(values.userId, values.followingId);
    }

    const data = await Followers.create({
      ...values,
      followerId: values.userId
    });

    console.log(data);
    return 'Your follow successfully has been applied.';
  } catch (e) {
    throw e;
  }
}

async function deleteFollow(followerId: number, followingId: number) {
  try {
    if (followerId === followingId) throw new CustomError("You can't unfollow yourself.", 400);

    const data = await Followers.destroy({
      where: {
        followerId,
        followingId
      }
    });

    console.log(data);
    return 'Your unfollow request successfully has been applied.';
  } catch (e) {
    throw e;
  }
}

export default {
  createFollower
};
