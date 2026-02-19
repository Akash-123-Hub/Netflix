/**
 * MovieCard - Individual movie poster with hover effect
 */
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null;
  const title = movie.Title || 'Unknown';
  const year = movie.Year || '';

  const handleClick = () => {
    if (movie.imdbID) {
      navigate(`/movie/${movie.imdbID}`);
    }
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className="movie-card-poster">
        {poster ? (
          <img src={poster} alt={title} loading="lazy" />
        ) : (
          <div className="movie-card-placeholder">No image</div>
        )}
      </div>
      <div className="movie-card-info">
        <h4 className="movie-card-title">{title}</h4>
        <span className="movie-card-year">{year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
