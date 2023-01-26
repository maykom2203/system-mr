import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (email, password) => {
  const { data } = await axios.post('http://localhost:3001/login', {
    email,
    password,
  });
  // .then((response) => {
  //   console.log(response);
  //   console.log('Authenticated ');
  // });
  console.log(data);
  return data;
};

export const requestCreate = async (body) => {
  let data;
  try {
    data = await axios.post('http://localhost:3001/register', body);
    return data;
  } catch (error) {
    return { data, message: 'usuario cadastrado', status: 409 };
  }

  // .then((response) => {
  // console.log(response);
  // console.log('Authenticated');
};

export default api;
