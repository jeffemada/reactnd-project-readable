import { getAllPosts, getPostsByCategory, votePost as votePostAPI } from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_POST = 'VOTE_POST';

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
      alert('Houve um erro ao votar no post. Tente novamente.');
    });
  };
}
