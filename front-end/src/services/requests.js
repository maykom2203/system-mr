import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (email, password) => {
  const { data } = await axios.post('http://localhost:3001/login', {
    email,
    password,
  });

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
};

export const requestUserData = async () => {
  let data;
  try {
    data = await axios.get('http://localhost:3001/register');
    return data;
  } catch (error) {
    return { message: 'falou a requisição', status: 409 };
  }
};

export default api;
