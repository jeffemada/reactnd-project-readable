const api = 'https://localhost:3001';
// Generate a unique token for storing your data on the backend server.
let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((response) => response.json())
    .then((data) => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then((response) => response.json())
    .then(data);

export const getAllComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((response) => response.json())
    .then(data);
