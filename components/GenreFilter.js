export default function GenreFilter({ genres, selectedGenre, onSelect }) {
    if (genres.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <button
                onClick={() => onSelect(null)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${selectedGenre === null
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => onSelect(genre.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${selectedGenre === genre.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}