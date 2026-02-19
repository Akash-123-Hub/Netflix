/**
 * Home page - Netflix-style browse with hero, movie rows, and search
 */
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import {
  fetchMovieRows,
  getFeaturedMovie,
} from '../api/omdb';

const ROW_TITLES = {
  action: 'Action',
  avengers: 'Avengers',
  batman: 'Batman',
  comedy: 'Comedy',
  popular: 'Popular Movies',
};

const Home = () => {
  const [movieRows, setMovieRows] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rows, hero] = await Promise.all([
          fetchMovieRows(),
          getFeaturedMovie(),
        ]);
        setMovieRows(rows);
        setFeatured(hero);
      } catch (err) {
        setError(err.message || 'Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSearchResults = (movies) => {
    setSearchResults(movies);
  };

  const featuredPoster =
    featured?.Poster && featured.Poster !== 'N/A' ? featured.Poster : null;

  return (
    <div className="home-page">
      <Navbar
        onSearchResults={handleSearchResults}
        onLogoClick={() => setSearchResults(null)}
        showSearch
      />

      {loading ? (
        <div className="loading-hero">
          <div className="skeleton skeleton-hero" />
          <div className="skeleton-rows">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-row" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="home-error">
          <p>{error}</p>
          <p className="home-error-hint">Check your connection and try again.</p>
        </div>
      ) : (
        <>
          {/* Search results take precedence */}
          {searchResults !== null ? (
            <div className="home-content">
              <h2 className="section-title">
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </h2>
              {searchResults.length === 0 ? (
                <p className="no-results">No movies found.</p>
              ) : (
                <MovieRow title="" movies={searchResults} />
              )}
            </div>
          ) : (
            <>
              {/* Hero section */}
              <section className="hero">
                <div
                  className="hero-bg"
                  style={
                    featuredPoster
                      ? {
                          backgroundImage: `linear-gradient(to top, #141414 0%, transparent 50%), url(${featuredPoster})`,
                        }
                      : {}
                  }
                />
                <div className="hero-content">
                  <h1 className="hero-title">{featured?.Title || 'Welcome'}</h1>
                  <p className="hero-year">{featured?.Year}</p>
                  <p className="hero-plot">{featured?.Plot || 'Browse thousands of movies.'}</p>
                </div>
              </section>

              {/* Movie rows */}
              <div className="home-content">
                {movieRows &&
                  Object.entries(movieRows).map(([key, movies]) =>
                    movies.length > 0 ? (
                      <MovieRow
                        key={key}
                        title={ROW_TITLES[key] || key}
                        movies={movies}
                      />
                    ) : null
                  )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
