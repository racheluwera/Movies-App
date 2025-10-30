
import { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemove(movie.id)}
                className="absolute bottom-2 left-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

//         ))}
//       </div>
//     </div>
//   );
// }

// export default PopularMovies;