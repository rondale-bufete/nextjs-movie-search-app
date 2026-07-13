import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request, { params }) {
    const { id } = await params;

    try {
        const res = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch trailer." }, { status: res.status });
        }

        const data = await res.json();
        const trailer =
            data.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
            data.videos?.results?.find((v) => v.site === "YouTube");

        return NextResponse.json({ key: trailer?.key || null });
    } catch (err) {
        return NextResponse.json({ error: "Failed to reach TMDB." }, { status: 500 });
    }
}