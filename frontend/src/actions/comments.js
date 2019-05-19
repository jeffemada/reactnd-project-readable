import { getAllComments, voteComment as voteCommentAPI } from '../utils/api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';

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
      alert('Houve um erro ao votar no comentário. Tente novamente.');
    });
  };
}
