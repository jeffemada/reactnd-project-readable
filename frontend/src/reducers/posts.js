import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';
import { ADD_POST, RECEIVE_POSTS, VOTE_POST } from '../actions/posts';
import { arrayToObject } from '../utils/helpers';

export default function posts(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state, // copy posts
        [action.comment.parentId]: {
          // update one specific post
          ...state[action.comment.parentId], // copy that specific post's properties
          commentCount: state[action.comment.parentId].commentCount + 1 // update property
        }
      };
    case ADD_POST:
      return {
        ...state, // copy posts
        [action.post.id]: action.post // add post
      };
    case DELETE_COMMENT:
      return {
        ...state, // copy posts
        [action.postId]: {
          // update one specific post
          ...state[action.postId], // copy that specific post's properties
          commentCount: state[action.postId].commentCount - 1 // update property
        }
      };
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
