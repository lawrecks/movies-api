import jwt from 'jsonwebtoken';
import config from '../../config/env';

const decodeToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

export default decodeToken;
