import jwt from 'jsonwebtoken';
import config from '../../config/env';

const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line arrow-body-style
export const generateToken = async (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '2h',
  });
};

export default decodeToken;
