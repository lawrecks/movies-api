import * as service from '../services/movie.service';
import { successResponse } from '../utils/helpers/response.helpers';

export const createMovie = async (req, res, next) => {
  try {
    const { title } = req.body;
    const movie = await service.fetchAndCreateMovie(title, req.decoded);
    const message = 'Movie created successfully';
    successResponse(res, message, 201, movie);
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('createMovie::authController', error);
    next(error);
  }
};

export const fetchMovies = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const movies = await service.getMovies(userId);
    const message = 'Movies fetched successfully';
    successResponse(res, message, 200, movies);
  } catch (error) {
    // eslint-disable-next-line no-undef
    logger.error('fetchMovies::authController', error);
    next(error);
  }
};
