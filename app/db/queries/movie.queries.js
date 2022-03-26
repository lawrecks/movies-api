export default {
  addMovie: `
    INSERT INTO movies(
      title,
      release_date,
      genre,
      director,
      user_id
    )
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING title, release_date, genre, director`,

  findMovieByTitle: `
    SELECT * FROM movies
    WHERE title=$1
  `,

  getUserCreatedMovies: `
  SELECT count(*)
  FROM movies
  WHERE extract(YEAR FROM created_at) = extract(YEAR FROM now())
        AND extract(MONTH FROM created_at) = extract(MONTH FROM now()) AND user_id = $1;
  `,
};
