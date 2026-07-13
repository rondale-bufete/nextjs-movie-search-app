import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
    if (movies.length === 0) {
        return (
            <p className="text-gray-500 text-center mt-16">
                No results found. Try a different search.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}