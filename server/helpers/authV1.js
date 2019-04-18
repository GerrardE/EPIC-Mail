import jwt from 'jsonwebtoken';

// const makeToken = (payload => jwt.sign({ payload }, process.env.SECRET_KEY));
const makeToken = (payload => jwt.sign({ payload }, process.env.SECRET_KEY));

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Error: no token supplied'
    });
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Error: token is not valid'
        });
      }

      req.decoded = decoded;
      return next();
    });
  }
};

export default { makeToken, verifyToken };
