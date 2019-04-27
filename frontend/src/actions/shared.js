import { receiveCategories } from './categories';
import { receivePosts } from './posts';
import { getAllCategories, getAllPosts } from '../utils/api';

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([getAllCategories(), getAllPosts()]).then(
      ([categories, posts]) => {
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
      }
    );
  };
}
