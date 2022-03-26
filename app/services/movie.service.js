import moment from 'moment';
import config from '../config/env';
import movieQueries from '../db/queries/movie.queries';
import db from '../db/setup/connection';
import sendHttpRequest from '../utils/helpers/api.helpers';
import checkIfMovieExists from '../utils/helpers/movie.helpers';
import { Error } from '../utils/helpers/response.helpers';

// eslint-disable-next-line object-curly-newline
const pickMovieDetails = ({ Title, Released, Genre, Director }) => ({
  Title,
  Released: Released !== 'N/A' ? Released : null,
  Genre,
  Director,
});

const fetchAndCreateMovie = async (title, user) => {
  const { status, data: result } = await sendHttpRequest(
    `https://www.omdbapi.com/?t=${title}&apikey=${config.OMDB_API_KEY}`,
    'GET',
  );
  if (status !== 200) {
    throw Error('Error creating movie', 500);
  }
  if (result.Response === 'False') {
    throw Error(`Error creating movie`, 500);
  }
  const payload = pickMovieDetails(result);
  payload.user_id = user.userId;
  await checkIfMovieExists(payload.Title);
  const movie = await db.one(movieQueries.addMovie, Object.values(payload));
  movie.released = movie.release_date
    ? moment(movie.release_date).format('DD MMM YYYY')
    : 'N/A';
  delete movie.release_date;
  return movie;
};

export default fetchAndCreateMovie;
