import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aesFont = localFont({
  src: "./fonts/Aesthetic_Beauty CF.otf",
  variable: "--font-aes",
});

export const metadata: Metadata = {
  title: "Martin Fesenko | ML Engineer",
  description: "Portfolio of Martin Fesenko, ML Engineer focused on AI/LLM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${aesFont.variable} font-aes antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}