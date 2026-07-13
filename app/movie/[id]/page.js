import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/lib/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export default async function MovieDetailPage({ params }) {
    const { id } = await params;

    let movie;
    try {
        movie = await getMovieDetails(id);
    } catch (err) {
        notFound();
    }

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
    const director = movie.credits?.crew?.find((person) => person.job === "Director");
    const topCast = movie.credits?.cast?.slice(0, 6) || [];

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            {movie.backdrop_path && (
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />
                </div>
            )}

            <div className="max-w-4xl mx-auto p-8 -mt-24 relative">
                <Link
                    href="/"
                    className="inline-block mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    ← Back to search
                </Link>

                <div className="flex flex-col md:flex-row gap-6">
                    {movie.poster_path && (
                        <div className="relative w-48 aspect-[2/3] rounded-xl overflow-hidden shrink-0 shadow-lg">
                            <Image
                                src={`${IMG_BASE}${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div>
                        <h1 className="text-3xl font-bold">{movie.title}</h1>
                        <p className="text-gray-500 mt-1">
                            {year} {director && `• Directed by ${director.name}`}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-lg font-semibold">⭐ {movie.vote_average?.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">{movie.runtime} min</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                </div>

                {topCast.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-4">Top Cast</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {topCast.map((actor) => (
                                <div key={actor.id} className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                                        {actor.profile_path && (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                                                alt={actor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{actor.name}</p>
                                        <p className="text-xs text-gray-500">{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}