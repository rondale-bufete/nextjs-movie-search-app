"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import TrailerModal from "./TrailerModal";
import { getMovieTrailerKey } from "@/lib/tmdb";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const SLIDE_DURATION = 6000;

export default function HeroCarousel({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [trailerLoading, setTrailerLoading] = useState(false);

    const goToNext = useCallback(() => {
        setCurrentIndex((i) => (i + 1) % movies.length);
    }, [movies.length]);

    useEffect(() => {
        if (isPaused || movies.length <= 1) return;
        const timer = setInterval(goToNext, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [isPaused, goToNext, movies.length]);

    async function handlePlayTrailer() {
        setTrailerLoading(true);
        try {
            const key = await getMovieTrailerKey(movies[currentIndex].id);
            if (key) setTrailerKey(key);
        } catch (err) {
            // fail silently
        } finally {
            setTrailerLoading(false);
        }
    }

    if (movies.length === 0) return null;

    const movie = movies[currentIndex];

    return (
        <div
            className="relative w-screen left-1/2 -translate-x-1/2 h-[65vh] md:h-[80vh] mb-8 overflow-hidden -mt-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Stacked backdrop layers, crossfading via opacity */}
            {movies.map((m, i) => (
                <div
                    key={m.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {m.backdrop_path && (
                        <div
                            key={`${m.id}-${i === currentIndex ? "active" : "idle"}`}
                            className={`absolute inset-0 ${i === currentIndex ? "animate-kenburns" : ""}`}
                        >
                            <Image
                                src={`${BACKDROP_BASE}${m.backdrop_path}`}
                                alt={m.title}
                                fill
                                priority={i === 0}
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-[#141414]/20 to-transparent" />

            <div
                key={movie.id}
                className="absolute bottom-12 md:bottom-20 left-0 px-8 md:px-16 max-w-2xl animate-fade-in-up"
            >
                <p className="text-[#E50914] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                    🔥 Trending Now
                </p>

                <h1
                    className="font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-wide leading-none mb-3"
                    style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
                >
                    {movie.title}
                </h1>

                <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="text-[#46D369] font-semibold">
                        {Math.round((movie.vote_average || 0) * 10)}% Rating
                    </span>
                    <span className="text-[#B3B3B3]">
                        {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                    </span>
                </div>

                <p className="text-[#D2D2D2] text-sm leading-relaxed line-clamp-3 mb-6 max-w-xl">
                    {movie.overview}
                </p>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePlayTrailer}
                        disabled={trailerLoading}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-white hover:bg-white/80 text-black text-sm font-semibold transition-colors disabled:opacity-60"
                    >
                        {trailerLoading ? "Loading..." : "▶ Play Trailer"}
                    </button>
                    <Link
                        href={`/movie/${movie.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#6D6D6D]/70 hover:bg-[#6D6D6D]/50 text-white text-sm font-semibold transition-colors"
                    >
                        More Info
                    </Link>
                </div>
            </div>

            {/* Progress-bar indicators */}
            <div className="absolute bottom-4 right-8 flex gap-1.5">
                {movies.map((m, i) => (
                    <button
                        key={m.id}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="w-8 h-1 rounded-full bg-white/25 overflow-hidden cursor-pointer"
                    >
                        {i < currentIndex && <div className="h-full bg-white w-full" />}
                        {i === currentIndex && (
                            <div
                                key={`progress-${currentIndex}`}
                                className={`h-full bg-white animate-progress ${isPaused ? "paused" : ""}`}
                            />
                        )}
                    </button>
                ))}
            </div>

            {trailerKey && (
                <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
            )}
        </div>
    );
}