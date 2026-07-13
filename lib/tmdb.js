const BASE_URL = "https://api.themoviedb.org/3";

async function tmdbFetch(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Not found.");
        }
        throw new Error("Something went wrong fetching data from TMDB.");
    }

    return res.json();
}

// Server-side only — used directly by Server Components (e.g. movie detail page)
export async function getMovieDetails(id) {
    return tmdbFetch(`/movie/${id}?append_to_response=credits`);
}

// Client-side — calls our own API route, which safely holds the secret token
export async function searchMovies(query) {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
    }

    return data.results;
}