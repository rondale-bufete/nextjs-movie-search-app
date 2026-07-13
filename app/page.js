"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import GenreFilter from "@/components/GenreFilter";
import { searchMovies, getGenres } from "@/lib/tmdb";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const [currentQuery, setCurrentQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => { });
  }, []);

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setCurrentQuery(query);
    setPage(1);

    try {
      const data = await searchMovies(query, 1);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const data = await searchMovies(currentQuery, nextPage);
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }

  const filteredMovies = useMemo(() => {
    if (selectedGenre === null) return movies;
    return movies.filter((movie) => movie.genre_ids?.includes(selectedGenre));
  }, [movies, selectedGenre]);

  const hasMore = page < totalPages;

  return (
    <main className="px-8 py-8 max-w-7xl mx-auto">
      {!searched && (
        <div className="text-center mt-24">
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl tracking-wide mb-4">
            Find your next watch
          </h1>
          <p className="text-[#B3B3B3] mb-8">
            Search thousands of movies, right where you are.
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {searched && !error && (
        <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
      )}

      {error && (
        <p className="text-white bg-[#E50914]/20 border border-[#E50914] rounded-md px-4 py-3 mb-6 max-w-2xl mx-auto">
          {error}
        </p>
      )}

      {searched && !loading && !error && (
        <>
          <MovieGrid movies={filteredMovies} />

          {hasMore && selectedGenre === null && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-8 mx-auto block px-6 py-2.5 rounded-md bg-[#2F2F2F] hover:bg-[#404040] text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </main>
  );
}