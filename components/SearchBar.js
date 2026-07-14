"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchBar({ onSearch, loading }) {
    const [input, setInput] = useState("");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (input.trim() === "") return;

        const timeoutId = setTimeout(() => onSearch(input.trim()), 400);
        return () => clearTimeout(timeoutId);
    }, [input, onSearch]);

    function handleSubmit(e) {
        e.preventDefault();
        if (input.trim() === "") return;
        onSearch(input.trim());
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Titles, people, genres"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-md bg-[#2F2F2F] text-white placeholder-[#8C8C8C] border border-transparent focus:outline-none focus:border-white transition-colors"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-md bg-[#E50914] hover:bg-[#f6121d] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-white transition-colors"
            >
                {loading ? "..." : "Search"}
            </button>
        </form>
    );
}