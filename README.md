# Netflix Clone - React Frontend

A production-quality Netflix-style web application built with React + Vite. Features user authentication, protected routes, movie browsing, search, and detailed movie pages powered by the OMDb API.

## Features

- **Authentication**: Sign Up and Login with validation, LocalStorage persistence
- **Protected Routes**: Home and Movie Details require authentication
- **Home Page**: Netflix-style hero section, horizontal movie rows (Action, Avengers, Batman, Comedy, Popular)
- **Search**: Real-time movie search via OMDb API
- **Movie Details**: Full info panel with poster, plot, cast, director, ratings
- **Responsive**: Desktop, tablet, and mobile support
- **Dark Theme**: Netflix-inspired (#141414 background, #E50914 accents)

## Tech Stack

- React 19 + Vite 7
- React Router DOM
- Axios
- Context API (authentication)
- Vanilla CSS (no build-time CSS framework)

## Installation

1. **Clone or navigate to the project**:
   ```bash
   cd Netflix
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Project

**Development server**:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Production build**:
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  api/
    omdb.js          # OMDb API service
  components/
    Navbar.jsx       # Header with logo, search, logout
    MovieCard.jsx    # Movie poster card with hover
    MovieRow.jsx     # Horizontal scrolling movie row
    ProtectedRoute.jsx # Auth guard for private routes
  context/
    AuthContext.jsx  # Auth state & actions
  pages/
    Login.jsx        # Login page
    Signup.jsx       # Sign up page
    Home.jsx         # Browse home with movie rows
    MovieDetails.jsx # Movie info page
  styles/
    variables.css   # Theme variables
  App.jsx
  main.jsx
  index.css
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Redirects to `/login` |
| `/login` | Login page |
| `/signup` | Sign up page |
| `/home` | Protected - Movie browse (requires login) |
| `/movie/:id` | Protected - Movie details (requires login) |

## OMDb API

Uses the Open Movie Database API ([omdbapi.com](https://www.omdbapi.com)) with API key `9e090280`. No backend required—all requests are made from the browser.

## Notes

- User data is stored in LocalStorage (no backend)
- Passwords are stored in plain text (for demo only—not for production)
- Click the NETFLIX logo to clear search and return to browse view
