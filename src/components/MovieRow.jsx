/**
 * MovieRow - Horizontal scrolling row of movie cards
 */
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-row">
      {title && <h3 className="movie-row-title">{title}</h3>}
      <div className="movie-row-scroll">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
