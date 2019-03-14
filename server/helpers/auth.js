import jwt from 'jsonwebtoken';

const makeToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  return token;
};

export default makeToken;
