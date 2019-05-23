import { hideLoading, showLoading } from 'react-redux-loading';
import { getAllCategories, getAllPosts } from '../utils/api';
import { receiveCategories } from './categories';
import { receivePosts } from './posts';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return Promise.all([getAllCategories(), getAllPosts()]).then(([categories, posts]) => {
      dispatch(receiveCategories(categories));
      dispatch(receivePosts(posts));
      dispatch(hideLoading());
    });
  };
}
