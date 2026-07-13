"use client";

import { useState, useEffect } from "react";

export default function TrailerButton({ trailerKey }) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent background scrolling while the modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") setIsOpen(false);
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!trailerKey) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-md bg-white hover:bg-white/80 text-black text-sm font-semibold transition-colors"
            >
                ▶ Play Trailer
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-[#B3B3B3] transition-colors"
                            aria-label="Close trailer"
                        >
                            ×
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Movie trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full rounded-md"
                        />
                    </div>
                </div>
            )}
        </>
    );
}