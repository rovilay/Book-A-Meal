import axios from 'axios';
import dotenv from 'dotenv';
import { getFromLocalStorage } from './localstorage';

dotenv.config();

const baseURL = process.env.BASE_URL;

/**
 * Sends async server requests using the axios api
 *
 * @param  {any} method - the request verb
 * @param  {any} url - the url the request is to be sent to
 * @param  {any} data - the payload to be sent with the request (optional)
 *   depending on the request method
 * @param  {any} authToken - the token for setting authorization header (optional)
 * @return {Promise} reponse data or error
 */
async function serverReq(method, url, data = {}, authToken) {
  const token = getFromLocalStorage('jwt') || authToken;
  return axios({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method,
    url,
    data
  });
}

export default serverReq;
