"use client";

import { useEffect } from "react";

export default function TrailerModal({ trailerKey, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
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
    );
}