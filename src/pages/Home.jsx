import { useState, useEffect } from 'react';
import MovieCard from '../Components/MovieCard';

function Movies({ onSelect }) {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); // ✅ NEW: favorites state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('avengers');

  const API_KEY = '47857c7c';

  // ✅ Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // ✅ Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async (search) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}&type=movie`
      );
      const data = await response.json();
      
      if (data.Response === 'True') {
        const movieDetails = await Promise.all(
          data.Search.slice(0, 8).map(async (movie) => {
            const detailResponse = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );
            const detailData = await detailResponse.json();
            return {
              id: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              genre: detailData.Genre || 'N/A',
              rating: detailData.imdbRating || 'N/A',
              poster: detailData.Poster !== 'N/A' ? detailData.Poster : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster'
            };
          })
        );
        setMovies(movieDetails);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search') || 'movie';
    if (search.trim()) {
      setSearchTerm(search);
    }
  };

  // ✅ Add to favorites handler
  const handleAddToFavorites = (movie) => {
    const alreadyFavorite = favorites.find((fav) => fav.id === movie.id);
    if (alreadyFavorite) {
      alert('This movie is already in your favorites.');
    } else {
      setFavorites([...favorites, movie]);
      alert(`${movie.title} added to favorites!`);
    }
  };

  const popularSearches = ['avengers', 'batman', 'superman', 'spiderman', 'star wars', 'marvel'];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-lg">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Movie Search</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            name="search"
            placeholder="Search for movies..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue={searchTerm}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
        
        {/* Popular Search Suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Try:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setSearchTerm(term)}
              className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
            >
              {term}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Results for "{searchTerm}"
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard movie={movie} onSelect={onSelect} />
            <button
              onClick={() => handleAddToFavorites(movie)}
              className="absolute bottom-2 left-2 px-3 py-1 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700"
            >
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {movies.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mt-8">
          No movies found. Try a different search term.
        </div>
      )}
    </div>
  );
}

export default Movies;
