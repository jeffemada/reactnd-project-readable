import { ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS, VOTE_COMMENT } from '../actions/comments';
import { arrayToObject } from '../utils/helpers';

export default function comments(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state, // copy comments
        [action.comment.id]: action.comment // add new comment
      };
    case DELETE_COMMENT:
      let comments = { ...state }; // copy comments
      delete comments[action.id]; // delete comment
      return {
        ...comments
      };
    case RECEIVE_COMMENTS:
      return {
        ...arrayToObject(action.comments, 'id') // update comments
      };
    case VOTE_COMMENT:
      return {
        ...state, // copy comments
        [action.id]: {
          // update one specific comment
          ...state[action.id], // copy that specific comment's properties
          voteScore: state[action.id].voteScore + (action.option === 'upVote' ? 1 : -1) // update property
        }
      };
    default:
      return state;
  }
}
