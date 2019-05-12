import { RECEIVE_POSTS, VOTE_POST } from '../actions/posts';
import { arrayToObject } from '../utils/helpers';

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...arrayToObject(action.posts, 'id') // update posts
      };
    case VOTE_POST:
      return {
        ...state, // copy posts
        [action.id]: {
          // update one specific post
          ...state[action.id], // copy that specific post's properties
          voteScore: state[action.id].voteScore + (action.option === 'upVote' ? 1 : -1) // update property
        }
      };
    default:
      return state;
  }
}
