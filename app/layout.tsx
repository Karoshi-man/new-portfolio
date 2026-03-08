import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import './globals.css';
import SmoothScrollProvider from "../components/SmoothScrollProvider";

const aesFont = localFont({
  src: "./fonts/Aesthetic_Beauty CF.otf",
  variable: "--font-aes",
  display: "swap",
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
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`
          ${aesFont.variable} 
          font-aes 
          antialiased 
          
          /* Базові кольори: білий фон/чорний текст */
          bg-white text-black 
          
          /* Темна тема: чорний фон/білий текст */
          dark:bg-black dark:text-white
        `}
      >
        <SmoothScrollProvider> 
          <Providers>
            {children}
          </Providers>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}