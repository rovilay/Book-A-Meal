import { getFromLs } from './Ls';

/**
 * Gets token from localstorage and Sets authorization token
 *
 * @param  {none}
 * @return {obje} return an object with headers property
 */
const authorization = () => {
  const token = getFromLs('jwt');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export default authorization;

