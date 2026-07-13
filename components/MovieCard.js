import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";
const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function MovieCard({ movie }) {
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
    const rating = movie.vote_average || 0;
    const percent = Math.round(rating * 10);
    const dashOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

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

                {/* Premium ring-style rating badge */}
                {rating > 0 && (
                    <div className="absolute top-2 right-2 w-11 h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle
                                cx="18"
                                cy="18"
                                r={RADIUS}
                                fill="rgba(0,0,0,0.65)"
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="2"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r={RADIUS}
                                fill="none"
                                stroke="url(#goldGradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray={CIRCUMFERENCE}
                                strokeDashoffset={dashOffset}
                            />
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F5C518" />
                                    <stop offset="100%" stopColor="#FFD700" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1px]">
                            <Star className="w-2.5 h-2.5 fill-[#F5D061] text-[#F5D061]" />
                            <span className="text-[9px] font-semibold text-[#F5D061] leading-none">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="font-[family-name:var(--font-display)] text-lg tracking-wide leading-tight">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#B3B3B3]">
                        <span className="text-[#46D369] font-semibold">
                            {Math.round((movie.vote_average || 0) * 10)}% Rating
                        </span>
                        <span>{year}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}