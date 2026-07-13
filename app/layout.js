import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Reel Search",
  description: "Find movies, fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-[#141414] text-white font-[family-name:var(--font-body)] min-h-screen">
        <header className="bg-black px-8 py-4 flex items-center">
          <a
            href="/"
            className="text-[#E50914] text-3xl tracking-wide font-[family-name:var(--font-display)]"
          >
            MOVIE SEARCH
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}