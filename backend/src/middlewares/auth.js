const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/status-codes');

const { NODE_ENV, SECRET_KEY } = process.env;

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: 'Пользователь не авторизован' });
};

// const SECRET_KEY = 'abra-shvabra-kadabra';
// const { checkToken } = require('../utils/jwtAuth');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return handleAuthError(res);
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  let payload;

  try {
    // payload = jwt.verify(token, SECRET_KEY);
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret'
    );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
