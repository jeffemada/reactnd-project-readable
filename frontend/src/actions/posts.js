import { hideLoading, showLoading } from 'react-redux-loading';
import {
  addPost as addPostAPI,
  deletePost as deletePostAPI,
  editPost as editPostAPI,
  getAllPosts,
  getPostsByCategory,
  votePost as votePostAPI
} from '../utils/api';
import { getUUID } from '../utils/helpers';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_POST = 'VOTE_POST';

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    id,
    option
  };
}

export function handleAddPost(title, body, author, category) {
  return (dispatch) => {
    dispatch(showLoading());
    return addPostAPI({ id: getUUID(), timestamp: new Date().getTime(), title, body, author, category })
      .then((post) => dispatch(addPost(post)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleDeletePost(id) {
  return (dispatch) => {
    dispatch(showLoading());

    return deletePostAPI(id)
      .then((post) => dispatch(deletePost(post.id)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleEditPost(id, title, body) {
  return (dispatch) => {
    dispatch(showLoading());

    return editPostAPI(id, { timestamp: new Date().getTime(), title, body })
      .then((post) => dispatch(editPost(post)))
      .then(() => dispatch(hideLoading()));
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

export function handleVotePost(id, option) {
  return (dispatch) => {
    dispatch(votePost(id, option));

    return votePostAPI(id, option).catch((e) => {
      console.warn('Error in handleVotePost: ', e);
      dispatch(votePost(id, option === 'upVote' ? 'downVote' : 'upVote'));
      alert('There was an error voting the post. Try again.');
    });
  };
}
