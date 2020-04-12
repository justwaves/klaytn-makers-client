import qs from "qs";
import apiClient from "./apiClient";

export const writePost = ({ title, body, tags }) =>
  apiClient.post("/api/posts", { title, body, tags });

export const readPost = id => apiClient.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return apiClient.get(`/api/posts?${queryString}`);
};
