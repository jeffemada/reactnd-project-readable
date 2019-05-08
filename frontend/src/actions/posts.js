import { getAllPosts, getPostsByCategory } from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function handleReceivePosts() {
  return (dispatch) => {
    return getAllPosts().then((posts) => {
      dispatch(receivePosts(posts));
    });
  };
}

export function handleReceivePostsByCategory(category) {
  return (dispatch) => {
    return getPostsByCategory(category).then((posts) => {
      dispatch(receivePosts(posts));
    });
  };
}
