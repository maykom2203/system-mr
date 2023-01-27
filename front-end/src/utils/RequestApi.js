import axios from 'axios';

const requestApi = axios.create({ baseURL: 'http://localhost:3001' });

export const getAllProducts = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const data = await requestApi.get('/customer/products', { headers: {
    Authorization: `${user.token}` } })
    .then((response) => response.data);
  return data;
};
export default requestApi;
