

function MovieCard({ movie }) {
  if (!movie) return null; 

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">
          {movie.genre} • {movie.year}
        </p>
        <span className="text-sm font-medium mt-2">⭐ {movie.rating}</span>
      </div>
    </div>
  );
}
  function Home({ movie, onSelect }) {
    const Movies = [
  
];
    return(
        <>
        {Movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}


<div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
{/* <img src={movie.poster} alt={movie.title} className="w-full h-56 object-cover" /> */}
<div className="p-4 flex-1 flex flex-col">
<h3 className="text-lg font-semibold">a</h3>
<p className="text-sm text-gray-500">b</p>
<div className="mt-2 flex items-center justify-between">
<span className="text-sm font-medium">⭐ c</span>
<button
onClick={() => onSelect(movie)}
className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
>
Details
</button>
</div>
</div>
</div>
        
        </>

    )};
    export default Home;