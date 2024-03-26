export type Data = {
  id: number;
  blogs: any[];
};

export function getFollowersBlogs(data: Data[]) {
  return data.map((item) => item.blogs).flat();
}
