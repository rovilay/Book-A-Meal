import axios from 'axios';

function signUpReq(userData) {
  const server = axios.create({ baseURL: 'http://localhost:4000' });
  return () => server.post('/api/v1/auth/signup', userData);
}

export default signUpReq;
