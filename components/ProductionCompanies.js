import Image from "next/image";

const LOGO_BASE = "https://image.tmdb.org/t/p/w200";

export default function ProductionCompanies({ companies }) {
    const withLogos = companies?.filter((c) => c.logo_path) || [];
    if (withLogos.length === 0) return null;

    return (
        <div className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide mb-4">
                Production
            </h2>
            <div className="flex flex-wrap items-center gap-6">
                {withLogos.map((company) => (
                    <div
                        key={company.id}
                        className="relative w-24 h-12 bg-white rounded-md p-2 flex items-center justify-center"
                        title={company.name}
                    >
                        <Image
                            src={`${LOGO_BASE}${company.logo_path}`}
                            alt={company.name}
                            fill
                            sizes="96px"
                            className="object-contain p-1"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}