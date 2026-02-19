/**
 * OMDb API service
 * Handles all movie data fetching from the Open Movie Database
 */
import axios from 'axios';

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = '9e090280';

const omdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
  timeout: 10000,
});

/**
 * Search movies by query string
 * @param {string} query - Search term
 * @param {number} page - Page number for pagination
 * @returns {Promise<{movies: Array, totalResults: number}>}
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || query.trim().length === 0) {
    return { movies: [], totalResults: 0 };
  }
  const { data } = await omdbClient.get('/', {
    params: { s: query.trim(), page },
  });
  if (data.Response === 'False') {
    return { movies: [], totalResults: 0 };
  }
  return {
    movies: data.Search || [],
    totalResults: parseInt(data.totalResults, 10) || 0,
  };
};

/**
 * Get detailed movie information by IMDB ID
 * @param {string} imdbId - IMDB movie ID
 * @returns {Promise<Object>} Movie details
 */
export const getMovieById = async (imdbId) => {
  const { data } = await omdbClient.get('/', {
    params: { i: imdbId, plot: 'full' },
  });
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found');
  }
  return data;
};

/**
 * Fetch multiple movie rows for homepage
 * Uses multiple search queries to get varied content
 * @param {string[]} queries - Array of search terms
 * @returns {Promise<Object>} Object with query keys and movie arrays
 */
export const fetchMovieRows = async (queries = ['action', 'avengers', 'batman', 'comedy', 'popular']) => {
  const defaultQueries = ['action', 'avengers', 'batman', 'comedy', 'popular'];
  const searchQueries = queries.length ? queries : defaultQueries;

  const results = await Promise.allSettled(
    searchQueries.map((q) => searchMovies(q))
  );

  const rows = {};
  searchQueries.forEach((query, index) => {
    const result = results[index];
    rows[query] =
      result.status === 'fulfilled' && result.value.movies.length
        ? result.value.movies
        : [];
  });
  return rows;
};

/**
 * Get a featured/popular movie for hero section (with full details/plot)
 * @returns {Promise<Object|null>} Featured movie or null
 */
export const getFeaturedMovie = async () => {
  try {
    const { movies } = await searchMovies('avengers');
    if (!movies?.length) return null;
    const first = movies[0];
    if (first.imdbID) {
      const full = await getMovieById(first.imdbID);
      return full;
    }
    return first;
  } catch {
    return null;
  }
};
