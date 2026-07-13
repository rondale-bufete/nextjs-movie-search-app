"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import GenreFilter from "@/components/GenreFilter";
import { searchMovies, getGenres, getPopularMovies, getNowPlayingMovies } from "@/lib/tmdb";

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

  const [browseType, setBrowseType] = useState("popular");
  const [browseMovies, setBrowseMovies] = useState([]);
  const [browseLoading, setBrowseLoading] = useState(true);
  const [browsePage, setBrowsePage] = useState(1);
  const [browseTotalPages, setBrowseTotalPages] = useState(1);
  const [browseLoadingMore, setBrowseLoadingMore] = useState(false);

  const sentinelRef = useRef(null);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => { });
  }, []);

  // Reset and fetch page 1 whenever the browse toggle changes
  useEffect(() => {
    setBrowseLoading(true);
    setBrowseMovies([]);
    setBrowsePage(1);

    const fetchFn = browseType === "popular" ? getPopularMovies : getNowPlayingMovies;

    fetchFn(1)
      .then((data) => {
        setBrowseMovies(data.results);
        setBrowseTotalPages(data.totalPages);
      })
      .catch(() => setBrowseMovies([]))
      .finally(() => setBrowseLoading(false));
  }, [browseType]);

  // Infinite scroll: watch the sentinel div, load next page when it enters view
  useEffect(() => {
    if (searched) return; // only active in browse mode
    if (browsePage >= browseTotalPages) return; // nothing more to load

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !browseLoadingMore) {
          loadNextBrowsePage();
        }
      },
      { rootMargin: "400px" } // start loading a bit before it's fully visible
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [searched, browsePage, browseTotalPages, browseLoadingMore, browseType]);

  async function loadNextBrowsePage() {
    setBrowseLoadingMore(true);
    const nextPage = browsePage + 1;
    const fetchFn = browseType === "popular" ? getPopularMovies : getNowPlayingMovies;

    try {
      const data = await fetchFn(nextPage);
      setBrowseMovies((prev) => [...prev, ...data.results]);
      setBrowsePage(nextPage);
    } catch (err) {
      // Silently stop trying on error — avoids a jarring error message mid-scroll
    } finally {
      setBrowseLoadingMore(false);
    }
  }

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
        <div className="text-center mt-16 mb-10">
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

      {!searched && (
        <div className="mt-4">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
              {browseType === "popular" ? "Popular Right Now" : "New Releases"}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setBrowseType("popular")}
                className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${browseType === "popular"
                    ? "bg-white text-black border-white"
                    : "border-[#808080] text-[#B3B3B3] hover:border-white hover:text-white"
                  }`}
              >
                Popular
              </button>
              <button
                onClick={() => setBrowseType("latest")}
                className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${browseType === "latest"
                    ? "bg-white text-black border-white"
                    : "border-[#808080] text-[#B3B3B3] hover:border-white hover:text-white"
                  }`}
              >
                Latest
              </button>
            </div>
          </div>

          {browseLoading ? (
            <p className="text-[#B3B3B3]">Loading...</p>
          ) : (
            <>
              <MovieGrid movies={browseMovies} />

              {/* Invisible sentinel — when this scrolls into view, the next page loads */}
              <div ref={sentinelRef} className="h-10" />

              {browseLoadingMore && (
                <p className="text-[#B3B3B3] text-center py-4">Loading more...</p>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}