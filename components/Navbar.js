"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 40);
        }

        handleScroll(); // check initial position (e.g. on page refresh mid-scroll)
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-40 px-8 py-4 transition-all duration-300 ${isScrolled
                ? "bg-black/70 backdrop-blur-md border-b border-white/10"
                : "bg-gradient-to-b from-black/60 to-transparent"
                }`}
        >
            <Link
                href="/"
                className="text-[#E50914] text-3xl tracking-wide font-[family-name:var(--font-display)]"
            >
                MOVIE SEARCH
            </Link>
        </header>
    );
}