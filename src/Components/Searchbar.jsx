import { useState, useMemo } from "react";
import MovieCard from "./MovieCard";

function Searchbar({ movies = [], onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">🎬 Movie List</h1>
          <input 
            type="text" 
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-full sm:w-72 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </header>
        
        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-600">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;