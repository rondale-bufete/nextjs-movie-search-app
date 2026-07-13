"use client";

import { useState } from "react";
import TrailerModal from "./TrailerModal";

export default function TrailerButton({ trailerKey }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!trailerKey) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-md bg-white hover:bg-white/80 text-black text-sm font-semibold transition-colors"
            >
                ▶ Play Trailer
            </button>

            {isOpen && <TrailerModal trailerKey={trailerKey} onClose={() => setIsOpen(false)} />}
        </>
    );
}