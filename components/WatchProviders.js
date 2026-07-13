import Image from "next/image";

const LOGO_BASE = "https://image.tmdb.org/t/p/w92";

export default function WatchProviders({ providers }) {
    const region = providers?.US; // defaulting to US; TMDB data is region-specific
    const flatrate = region?.flatrate || [];

    if (flatrate.length === 0) return null;

    return (
        <div className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide mb-4">
                Where to Watch
            </h2>
            <div className="flex flex-wrap gap-3">
                {flatrate.map((provider) => (
                    <div
                        key={provider.provider_id}
                        className="relative w-12 h-12 rounded-lg overflow-hidden"
                        title={provider.provider_name}
                    >
                        <Image
                            src={`${LOGO_BASE}${provider.logo_path}`}
                            alt={provider.provider_name}
                            fill
                            sizes="48px"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
            <p className="text-xs text-[#6D6D6D] mt-3">
                Streaming availability data provided by JustWatch (US region).
            </p>
        </div>
    );
}