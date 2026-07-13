import Image from "next/image";

const PROFILE_BASE = "https://image.tmdb.org/t/p/w342";

export default function CastList({ cast }) {
    if (cast.length === 0) return null;

    return (
        <div className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide mb-4">
                Cast
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-8 px-8 md:-mx-16 md:px-16 snap-x snap-mandatory">
                {cast.map((actor) => (
                    <div
                        key={actor.id}
                        className="group shrink-0 w-32 snap-start"
                    >
                        <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden bg-[#2F2F2F] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-black/60">
                            {actor.profile_path ? (
                                <Image
                                    src={`${PROFILE_BASE}${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#6D6D6D] text-3xl">
                                    👤
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>

                        <p className="mt-2 text-sm font-medium leading-tight truncate">
                            {actor.name}
                        </p>
                        <p className="text-xs text-[#8C8C8C] leading-tight truncate">
                            {actor.character}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}