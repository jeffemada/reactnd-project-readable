import { getAllComments } from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

export function handleReceiveComments(postId) {
  return (dispatch) => {
    return getAllComments(postId).then((comments) => {
      dispatch(receiveComments(comments));
    });
  };
}
