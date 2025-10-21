function MovieCard({ movie, onSelect }) {
  if (!movie) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-56 object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster';
        }}
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {movie.genre} • {movie.year}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium">⭐ {movie.rating}</span>
          {onSelect && (
            <button
              onClick={() => onSelect(movie)}
              className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;