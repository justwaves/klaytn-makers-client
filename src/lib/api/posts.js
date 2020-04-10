import apiClient from "./apiClient";

export const writePost = ({ title, body, tags }) =>
  apiClient.post("/api/posts", { title, body, tags });
