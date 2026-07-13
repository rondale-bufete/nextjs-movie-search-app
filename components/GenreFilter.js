export default function GenreFilter({ genres, selectedGenre, onSelect }) {
    if (genres.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                onClick={() => onSelect(null)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${selectedGenre === null
                        ? "bg-white text-black border-white"
                        : "border-[#808080] text-[#B3B3B3] hover:border-white hover:text-white"
                    }`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => onSelect(genre.id)}
                    className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${selectedGenre === genre.id
                            ? "bg-white text-black border-white"
                            : "border-[#808080] text-[#B3B3B3] hover:border-white hover:text-white"
                        }`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}