/* eslint-disable consistent-return */
import movieQueries from '../../db/queries/movie.queries';
import db from '../../db/setup/connection';
import { Error } from './response.helpers';

const checkIfMovieExists = async (title) => {
  const [movie] = await db.any(movieQueries.findMovieByTitle, title);
  if (movie) {
    throw Error('Movie already exist', 400);
  }
  return false;
};

export default checkIfMovieExists;
