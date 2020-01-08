import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todos-a3136.firebaseio.com/'
});
export default instance;
