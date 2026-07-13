import Image from "next/image";
import Link from "next/link";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie }) {
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

    return (
        <Link
            href={`/movie/${movie.id}`}
            className="group relative block rounded-md overflow-hidden bg-[#2F2F2F] transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl hover:shadow-black/80"
        >
            <div className="relative w-full aspect-[2/3]">
                {movie.poster_path ? (
                    <Image
                        src={`${IMG_BASE}${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#B3B3B3] text-sm bg-[#2F2F2F]">
                        No poster
                    </div>
                )}

                {/* Always-visible rating badge */}
                {rating && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/75 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-semibold">
                        <span className="text-[#F5C518]">★</span>
                        <span>{rating}</span>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="font-[family-name:var(--font-display)] text-lg tracking-wide leading-tight">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#B3B3B3]">
                        <span className="text-[#46D369] font-semibold">
                            {Math.round((movie.vote_average || 0) * 10)}% match
                        </span>
                        <span>{year}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}