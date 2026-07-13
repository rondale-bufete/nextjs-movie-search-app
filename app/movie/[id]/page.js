import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/tmdb";
import TrailerButton from "@/components/TrailerButton";
import CastList from "@/components/CastList";
import ProductionCompanies from "@/components/ProductionCompanies";
import WatchProviders from "@/components/WatchProviders";
import MovieGrid from "@/components/MovieGrid";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

function formatCurrency(amount) {
    if (!amount || amount === 0) return null;
    if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
}

export default async function MovieDetailPage({ params }) {
    const { id } = await params;

    let movie;
    try {
        movie = await getMovieDetails(id);
    } catch (err) {
        notFound();
    }

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
    const director = movie.credits?.crew?.find((p) => p.job === "Director");
    const topCast = movie.credits?.cast?.slice(0, 15) || [];
    const trailer =
        movie.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        movie.videos?.results?.find((v) => v.site === "YouTube");
    const recommendations = movie.recommendations?.results?.slice(0, 10) || [];

    const budget = formatCurrency(movie.budget);
    const revenue = formatCurrency(movie.revenue);

    return (
        <main>
            {movie.backdrop_path && (
                <div className="relative w-full h-[70vh]">
                    <Image
                        src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                        <Link href="/" className="inline-block mb-4 text-sm text-[#B3B3B3] hover:text-white">
                            ← Back to search
                        </Link>
                        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl tracking-wide leading-none">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="text-[#B3B3B3] italic mt-2 text-sm md:text-base">
                                &ldquo;{movie.tagline}&rdquo;
                            </p>
                        )}

                        <div className="flex items-center gap-3 mt-4 text-sm flex-wrap">
                            <span className="text-[#46D369] font-semibold">
                                ★ {movie.vote_average?.toFixed(1)} Rating
                            </span>
                            <span className="text-[#B3B3B3]">{year}</span>
                            <span className="text-[#B3B3B3]">{movie.runtime} min</span>
                            {movie.status && movie.status !== "Released" && (
                                <span className="text-xs px-2 py-0.5 rounded border border-[#E50914] text-[#E50914]">
                                    {movie.status}
                                </span>
                            )}
                        </div>

                        <TrailerButton trailerKey={trailer?.key} />
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto p-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {movie.poster_path && (
                        <div className="relative w-40 aspect-[2/3] rounded-md overflow-hidden shrink-0 shadow-xl -mt-24 hidden md:block">
                            <Image
                                src={`${IMG_BASE}${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div>
                        {director && (
                            <p className="text-[#B3B3B3] text-sm mb-3">
                                <span className="text-white">Director:</span> {director.name}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="text-xs px-3 py-1 rounded-full border border-[#808080] text-[#B3B3B3]"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-[#D2D2D2] leading-relaxed">{movie.overview}</p>

                        {(budget || revenue) && (
                            <div className="flex gap-8 mt-5 text-sm">
                                {budget && (
                                    <div>
                                        <p className="text-[#6D6D6D] text-xs uppercase tracking-wide">Budget</p>
                                        <p className="font-semibold mt-0.5">{budget}</p>
                                    </div>
                                )}
                                {revenue && (
                                    <div>
                                        <p className="text-[#6D6D6D] text-xs uppercase tracking-wide">Box Office</p>
                                        <p className="font-semibold mt-0.5">{revenue}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <CastList cast={topCast} />
                <WatchProviders providers={movie["watch/providers"]?.results} />
                <ProductionCompanies companies={movie.production_companies} />

                {recommendations.length > 0 && (
                    <div className="mt-10">
                        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide mb-4">
                            More Like This
                        </h2>
                        <MovieGrid movies={recommendations} />
                    </div>
                )}
            </div>
        </main>
    );
}