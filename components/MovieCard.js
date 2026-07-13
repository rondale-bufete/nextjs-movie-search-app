import Image from "next/image";
import Link from "next/link";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie }) {
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

    return (
        <Link
            href={`/movie/${movie.id}`}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-colors"
        >
            <div className="relative w-full aspect-[2/3] bg-gray-200 dark:bg-gray-800">
                {movie.poster_path ? (
                    <Image
                        src={`${IMG_BASE}${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No poster
                    </div>
                )}
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                    <span>{year}</span>
                    <span>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</span>
                </div>
            </div>
        </Link>
    );
}