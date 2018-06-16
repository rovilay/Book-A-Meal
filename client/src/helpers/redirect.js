import isExpired from './isExpired';
import jwt from 'jsonwebtoken';

import { getFromLs } from './Ls';

const reDirect = (token) => {
  const token = getFromLs('jwt');
  if(token) {
    const {
      exp
    } = jwt.decode(token);

    isExpired(exp)
  }
}