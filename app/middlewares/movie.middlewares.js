/* eslint-disable consistent-return */
import movieQueries from '../db/queries/movie.queries';
import db from '../db/setup/connection';
import { Error } from '../utils/helpers/response.helpers';

const checkCreateLimit = async (req, res, next) => {
  try {
    const { role, userId } = req.decoded;
    if (role === 'premium') {
      return next();
    }
    const [result] = await db.any(movieQueries.getUserCreatedMovies, userId);
    if (result.count >= 5 && role === 'basic') {
      throw Error(`Movie create limit reached for this user`, 400);
    }
    return next();
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('checkCreateLimit::movieMiddleware', error);
    next(error);
  }
};

export default checkCreateLimit;
