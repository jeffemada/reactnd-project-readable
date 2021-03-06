import { hideLoading, showLoading } from 'react-redux-loading';
import {
  addComment as addCommentAPI,
  deleteComment as deleteCommentAPI,
  editComment as editCommentAPI,
  getAllComments,
  voteComment as voteCommentAPI
} from '../utils/api';
import { getUUID } from '../utils/helpers';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function deleteComment(id, postId) {
  return {
    type: DELETE_COMMENT,
    id,
    postId
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option
  };
}

export function handleAddComment(author, body, postId) {
  return (dispatch) => {
    dispatch(showLoading());
    return addCommentAPI({ id: getUUID(), timestamp: new Date().getTime(), body, author, parentId: postId })
      .then((comment) => dispatch(addComment(comment)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleDeleteComment(id) {
  return (dispatch) => {
    dispatch(showLoading());

    return deleteCommentAPI(id)
      .then((comment) => dispatch(deleteComment(comment.id, comment.parentId)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleEditComment(id, body) {
  return (dispatch) => {
    dispatch(showLoading());

    return editCommentAPI(id, { timestamp: new Date().getTime(), body })
      .then((comment) => dispatch(editComment(comment)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleReceiveComments(postId) {
  return (dispatch) => {
    return getAllComments(postId).then((comments) => {
      dispatch(receiveComments(comments));
    });
  };
}

export function handleVoteComment(id, option) {
  return (dispatch) => {
    dispatch(voteComment(id, option));
    return voteCommentAPI(id, option).catch((e) => {
      console.warn('Error in handleVoteComment: ', e);
      dispatch(voteComment(id, option === 'upVote' ? 'downVote' : 'upVote'));
      alert('There was an error voting the comment. Try again.');
    });
  };
}
