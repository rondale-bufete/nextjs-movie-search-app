import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/genre/movie/list`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch genres." }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ genres: data.genres });
    } catch (err) {
        return NextResponse.json({ error: "Failed to reach TMDB." }, { status: 500 });
    }
}