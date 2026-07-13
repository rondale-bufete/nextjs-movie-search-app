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

// Server-side only — used directly by Server Components
export async function getMovieDetails(id) {
    return tmdbFetch(`/movie/${id}?append_to_response=credits,videos`);
}

// Client-side — calls our API routes
export async function searchMovies(query, page = 1) {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
    }

    return data; // { results, totalPages, page }
}

export async function getGenres() {
    const res = await fetch(`/api/genres`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch genres.");
    }

    return data.genres;
}

export async function getPopularMovies(page = 1) {
    const res = await fetch(`/api/popular?page=${page}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch popular movies.");
    }

    return data; // { results, totalPages }
}

export async function getNowPlayingMovies(page = 1) {
    const res = await fetch(`/api/now-playing?page=${page}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch latest movies.");
    }

    return data; // { results, totalPages }
}

export async function getMovieTrailerKey(id) {
    const res = await fetch(`/api/movie/${id}/trailer`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch trailer.");
    }

    return data.key;
}