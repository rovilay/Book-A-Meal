import jwt from 'jsonwebtoken';

function getToken(req, res, next) {
  // Get auth header from req header
  const token = req.headers.authorization;

  if(token !== undefined) {
    // verify token
    jwt.verify(token, 'homealone', (err, userData) => {
      req.userData = userData;
      if(err) {
        res.status(400).send(err);
      }
      next();
    });

  } else {
    return res.sendStatus(403);
  }
}

export default getToken;