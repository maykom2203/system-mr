import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (email, password) => {
  await axios.post('http://localhost:3001/login', {
    email,
    password,
  })
    .then((response) => {
      console.log(response);
      console.log('Authenticated');
      return 'passou';
    });
};

export default api;
