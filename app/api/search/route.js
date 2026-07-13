import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";

    if (!query || query.trim() === "") {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    try {
        const res = await fetch(
            `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                    Accept: "application/json",
                },
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Something went wrong fetching data from TMDB." },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json({
            results: data.results,
            totalPages: data.total_pages,
            page: data.page,
        });
    } catch (err) {
        return NextResponse.json({ error: "Failed to reach TMDB." }, { status: 500 });
    }
}