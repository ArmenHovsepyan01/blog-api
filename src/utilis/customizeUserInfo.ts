export function customizeUserInfo(data: any) {
  data.userFollowed = data.userFollowed.map((item) => {
    return item.followingUser;
  });

  data.userFollowers = data.userFollowers.map((item) => {
    return item.followerUser;
  });

  return data;
}
