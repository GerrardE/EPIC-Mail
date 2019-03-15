import jwt from 'jsonwebtoken';

// const makeToken = (payload => jwt.sign({ payload }, { expiresIn: '24h' }, process.env.SECRET_KEY));

const makeToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'Fail',
      mesage: 'Error: no token supplied'
    });
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Error: Token is not valid'
        });
      }

      req.decoded = decoded;
      return next();
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Error: Auth token is not supplied'
  });
};

export default { makeToken, verifyToken };
