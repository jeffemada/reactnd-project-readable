import { RECEIVE_COMMENTS } from '../actions/comments';
import { arrayToObject } from '../utils/helpers';

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...arrayToObject(action.comments, 'id') // update comments
      };
    default:
      return state;
  }
}
