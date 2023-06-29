/* eslint-disable comma-dangle */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }

  const token = authorization.replace('Bearer ', '');

  // const token = req.headers.authorization.replace('Bearer ', '');

  // if (!token) {
  //   return next(new UnauthorizedError('Пользователь не авторизован'));
  // }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret'
    );
  } catch (err) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }

  req.user = payload;

  return next();
};

module.exports = {
  auth,
};
