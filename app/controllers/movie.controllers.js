import fetchAndCreateMovie from '../services/movie.service';
import { successResponse } from '../utils/helpers/response.helpers';

const createMovie = async (req, res, next) => {
  try {
    const { title } = req.body;
    const movie = await fetchAndCreateMovie(title, req.decoded);
    const message = 'Movie created successfully';
    successResponse(res, message, 201, movie);
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('createMovie::authController', error);
    next(error);
  }
};

export default createMovie;
