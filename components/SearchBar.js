"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
    const [input, setInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (input.trim() === "") return;
        onSearch(input.trim());
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for a movie..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-white"
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}