import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    try {
        const res = await fetch(`${BASE_URL}/movie/popular?page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch popular movies." }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ results: data.results, totalPages: data.total_pages });
    } catch (err) {
        return NextResponse.json({ error: "Failed to reach TMDB." }, { status: 500 });
    }
}