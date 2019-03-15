import jwt from 'jsonwebtoken';

const makeToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'Fail',
      mesage: 'No token supplied'
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
  } else {
    return res.json({
      success: false,
      message: 'Error: Auth token is not supplied'
    });
  }
};

export default { makeToken, verifyToken };
