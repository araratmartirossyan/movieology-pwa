import { request } from "./../utils/request";

export default class BlogService {
  async fetchPosts() {
    try {
      const data = await request("get", "posts", "api");
      return data;
    } catch (err) {
      throw err;
    }
  }
}
