export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export function receiveComments(postId, comments) {
  return {
    type: RECEIVE_COMMENTS,
    postId,
    comments
  };
}
