import axios from 'axios';

const baseUrl = 'http://Localhost:4000';
/**
 * Sends async server requests using the axios api
 *
 * @param  {any} method - the request verb
 * @param  {any} url - the url the request is to be sent to
 * @param  {any} data - the payload to be sent with the request (optional)
 * depending on the request method
 * @param  {any} authToken - the token for setting authorization header (optional)
 * @return {promise} reponse data
 */
async function serverReq(method, url, data, authToken) {
  try {
    // let headers;
    if (data) {
      data = { ...data };
    }

    if (authToken) {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${authToken}`;
        return config;
      });
    }

    const instance = await axios({
      baseURL: baseUrl,
      // headers,
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

