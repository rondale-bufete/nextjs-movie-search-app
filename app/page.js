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

  // Fetch the genre list once, on mount
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

  // Derived state: filter movies by selected genre, without storing a separate copy
  const filteredMovies = useMemo(() => {
    if (selectedGenre === null) return movies;
    return movies.filter((movie) => movie.genre_ids?.includes(selectedGenre));
  }, [movies, selectedGenre]);

  const hasMore = page < totalPages;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Movie Search</h1>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {searched && !error && (
        <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
      )}

      {error && (
        <p className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {!searched && !error && (
        <p className="text-gray-500 text-center mt-16">
          Search for a movie to get started.
        </p>
      )}

      {searched && !loading && !error && (
        <>
          <MovieGrid movies={filteredMovies} />

          {hasMore && selectedGenre === null && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-6 w-full text-sm py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </main>
  );
}