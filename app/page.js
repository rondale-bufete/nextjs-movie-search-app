"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { searchMovies } from "@/lib/tmdb";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(query) {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Movie Search</h1>

      <SearchBar onSearch={handleSearch} loading={loading} />

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

      {searched && !loading && !error && <MovieGrid movies={movies} />}
    </main>
  );
}