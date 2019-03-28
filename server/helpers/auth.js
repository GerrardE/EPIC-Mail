import jwt from 'jsonwebtoken';

const makeToken = (payload => jwt.sign(payload, 'authkey', { expiresIn: '24d' }));

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'Fail',
      mesage: 'Error: no token supplied'
    });
  }

  if (token) {
    jwt.verify(token, 'authkey', (err, decoded) => {
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
};

export default { makeToken, verifyToken };
