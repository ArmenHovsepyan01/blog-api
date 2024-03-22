export function customizeUserInfo(data: any, filter = false) {
  if (data.userFollowed) {
    data.userFollowed = data.userFollowed.map((item) => {
      return item.followingUser;
    });
  }

  if (data.userFollowers) {
    data.userFollowers = data.userFollowers.map((item) => {
      return item.followerUser;
    });
  }

  if (filter) {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userFollowed: data.userFollowed,
      userFollowers: data.userFollowers
    };
  }

  return data;
}
