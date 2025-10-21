import { useState } from 'react';
import PopularMovies from './pages/fovorites';
import Movies from './pages/Movies';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState('popular');

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    alert(`Selected: ${movie.title}\nYear: ${movie.year}\nRating: ${movie.rating}\nGenre: ${movie.genre}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-indigo-600">MovieDB</h1>
            <div className="space-x-4">
              <button 
                onClick={() => setCurrentView('popular')}
                className={`px-4 py-2 rounded-md ${
                  currentView === 'popular' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Popular
              </button>
              <button 
                onClick={() => setCurrentView('search')}
                className={`px-4 py-2 rounded-md ${
                  currentView === 'search' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {currentView === 'popular' && <PopularMovies onSelect={handleSelectMovie} />}
      {currentView === 'search' && <Movies onSelect={handleSelectMovie} />}
      
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
            <p><strong>Rating:</strong> ⭐ {selectedMovie.rating}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <button
              onClick={() => setSelectedMovie(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;