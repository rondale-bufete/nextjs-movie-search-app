import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
    if (movies.length === 0) {
        return (
            <p className="text-[#B3B3B3] text-center mt-16">
                No results found. Try a different search.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-2">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}