/**
 * MovieDetails - Full movie info panel (Netflix-style)
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getMovieById } from '../api/omdb';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load movie');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [id]);

  const poster = movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : null;

  if (loading) {
    return (
      <div className="details-page">
        <Navbar showSearch={false} />
        <div className="details-loading">
          <div className="skeleton skeleton-poster" />
          <div className="skeleton-details">
            <div className="skeleton skeleton-line w-60" />
            <div className="skeleton skeleton-line w-40" />
            <div className="skeleton skeleton-line w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details-page">
        <Navbar showSearch={false} />
        <div className="details-error">
          <p>{error || 'Movie not found'}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/home')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Navbar showSearch={false} />
      <div className="details-container">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <div className="details-content">
          <div className="details-poster">
            {poster ? (
              <img src={poster} alt={movie.Title} />
            ) : (
              <div className="details-poster-placeholder">No image</div>
            )}
          </div>
          <div className="details-info">
            <h1 className="details-title">{movie.Title}</h1>
            <div className="details-meta">
              {movie.Year && <span>{movie.Year}</span>}
              {movie.Genre && movie.Genre !== 'N/A' && (
                <span> • {movie.Genre}</span>
              )}
              {movie.Runtime && movie.Runtime !== 'N/A' && (
                <span> • {movie.Runtime}</span>
              )}
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <span className="details-rating"> ★ {movie.imdbRating}</span>
              )}
            </div>
            {movie.Director && movie.Director !== 'N/A' && (
              <p className="details-line">
                <strong>Director:</strong> {movie.Director}
              </p>
            )}
            {movie.Actors && movie.Actors !== 'N/A' && (
              <p className="details-line">
                <strong>Actors:</strong> {movie.Actors}
              </p>
            )}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <p className="details-plot">{movie.Plot}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
