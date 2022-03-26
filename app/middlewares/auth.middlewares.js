/* eslint-disable consistent-return */
import decodeToken from '../utils/helpers/hash.helpers';
import { Error } from '../utils/helpers/response.helpers';

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw Error('Please provide a token', 400);
    }

    // Remove Bearer from string
    token = token.slice(7, token.length);
    const decoded = decodeToken(token);

    if (decoded.message) {
      throw Error(decoded.message, 401);
    }
    req.decoded = { ...decoded };
    return next();
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('verifyToken::authMiddleware', error);
    next(error);
  }
};

export const canAccess = (role) => (req, res, next) => {
  try {
    const { role: userRole } = req.decoded;
    if (role === userRole || role === 'all') {
      return next();
    }
    throw Error(`Unauthorized for ${userRole} users`, 401);
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('canAccess::authMiddleware', error);
    next(error);
  }
};

export default verifyToken;
