/**
 * Navbar - Netflix-style header with logo, search, and logout
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { searchMovies } from '../api/omdb';

const Navbar = ({ onSearchResults, onLogoClick, showSearch = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const { movies } = await searchMovies(searchQuery);
      onSearchResults?.(movies);
    } catch (err) {
      onSearchResults?.([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button
          type="button"
          className="navbar-logo"
          onClick={() => {
            onLogoClick?.();
            navigate('/home');
          }}
        >
          NETFLIX
        </button>

        {showSearch && (
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button
              type="submit"
              className="navbar-search-btn"
              disabled={isSearching}
            >
              {isSearching ? '...' : 'Search'}
            </button>
          </form>
        )}

        <div className="navbar-right">
          <span className="navbar-user">{user?.name}</span>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
