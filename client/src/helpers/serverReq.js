import axios from 'axios';

function postReq(userData, baseUrl) {
  const server = axios.create({ baseURL: baseUrl || 'http://localhost:4000' });
  return () => server.post('/api/v1/auth/signup', userData);
}

// function getReq() {

// }

export default postReq;
