import axios from 'axios';
import { getFromLs } from './Ls';

// window.axios = axios;
const baseURL = 'http://localhost:5000';

/**
 * Sends async server requests using the axios api
 *
 * @param  {any} method - the request verb
 * @param  {any} url - the url the request is to be sent to
 * @param  {any} data - the payload to be sent with the request (optional)
 * depending on the request method
 * @param  {any} authToken - the token for setting authorization header (optional)
 * @return {Promise} reponse data or error
 */
async function serverReq(method, url, data = {}, authToken) {
  const token = getFromLs('jwt') || authToken;
  try {
    const instance = await axios({
      baseURL,
      headers: {
        // 'Access-Control-Allow-Headers': 'x-client-version',
        // 'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`
      },
      method,
      url,
      data
    });

    return instance;
  } catch (err) {
    if (err.response) {
      return err.response;
    }

    return err;
  }
}

export default serverReq;

