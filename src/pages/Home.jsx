import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function HomeMovies({ onSelect }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = '47857c7c'; // Your actual API key

  // Pre-defined popular search terms
  const popularSearches = ['avengers', 'batman', 'marvel', 'spiderman'];

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const allMovies = [];
        
        for (const search of popularSearches.slice(0, 2)) {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=movie`
          );
          const data = await response.json();
          
          if (data.Response === 'True') {
            // Get detailed info for each movie
            const detailedMovies = await Promise.all(
              data.Search.slice(0, 4).map(async (movie) => {
                try {
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
                // eslint-disable-next-line no-unused-vars
                } catch (error) {
                  return {
                    id: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    genre: 'Movie',
                    rating: 'N/A',
                    poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster'
                  };
                }
              })
            );
            allMovies.push(...detailedMovies);
          }
        }
        
        // Remove duplicates and limit to 8 movies
        const uniqueMovies = allMovies.filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
        ).slice(0, 8);
        
        setMovies(uniqueMovies);
      } catch (err) {
        setError('Failed to load popular movies');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-lg">Loading popular movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeMovies;