import { Bebas_Neue, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}