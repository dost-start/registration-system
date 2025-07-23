import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { orbitron, montserrat, roboto, robotoMono } from "../lib/fonts";
const garetBook = localFont({
  src: "../assets/Garet-Book.otf",
  variable: "--font-garet-book",
  display: "swap",
});

const kagitinganBold = localFont({
  src: "../assets/Kagitingan-Bold.otf",
  variable: "--font-kagitingan-bold",
  display: "swap",
});

const monument = localFont({
  src: "../assets/Monument.otf",
  variable: "--font-monument",
  display: "swap",
});
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "START Registration System",
  description:
    "Registration system for Scholars Transformed Advancement and Research for Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          ${orbitron.variable} ${montserrat.variable} ${roboto.variable} ${robotoMono.variable}
          ${garetBook.variable} ${kagitinganBold.variable} ${monument.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
