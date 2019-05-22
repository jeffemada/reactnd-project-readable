const api = 'http://localhost:3001';
// Generate a unique token for storing your data on the backend server.
let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
  'Content-type': 'application/json'
};

/* Category */
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((response) => response.json())
    .then((data) => data.categories);

/* Post */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then((response) => response.json())
    .then((data) => data);

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then((response) => response.json())
    .then((data) => data);

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, { headers, method: 'POST', body: `${JSON.stringify({ option })}` })
    .then((response) => response.json())
    .then((data) => data);

/* Comments */
export const getAllComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then((response) => response.json())
    .then((data) => data);

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, { headers, method: 'POST', body: `${JSON.stringify({ option })}` })
    .then((response) => response.json())
    .then((data) => data);

export const addComment = (comment) =>
  fetch(`${api}/comments`, { headers, method: 'POST', body: `${JSON.stringify(comment)}` })
    .then((response) => response.json())
    .then((data) => data);

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => data);

export const editComment = (id, data) =>
  fetch(`${api}/comments/${id}`, { headers, method: 'PUT', body: `${JSON.stringify(data)}` })
    .then((response) => response.json())
    .then((data) => data);
