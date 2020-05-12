import qs from 'qs';
import apiClient from './apiClient';

export const writePost = ({
  title,
  body,
  tags,
  description,
  photo,
  price,
  targetCount,
  dDay,
}) =>
  apiClient.post('/api/posts', {
    title,
    body,
    tags,
    description,
    photo,
    price,
    targetCount,
    dDay,
  });

export const readPost = id => apiClient.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return apiClient.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) =>
  apiClient.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = id => apiClient.delete(`/api/posts/${id}`);
