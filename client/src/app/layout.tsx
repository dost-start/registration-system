import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "National Technovation Summit 2025 | DOST START",
  description:
    "A 1-day event that aims to bring together DOST-SEI scholars, industry experts, and thought leaders to inspire a collective vision of progress and innovation in the country.",
  keywords: [
    "technovation",
    "innovation",
    "DOST",
    "summit",
    "technology",
    "scholars",
    "Philippines",
  ],
  authors: [{ name: "DOST START" }],
  openGraph: {
    title: "National Technovation Summit 2025",
    description:
      "A 1-day event that aims to bring together DOST-SEI scholars, industry experts, and thought leaders to inspire a collective vision of progress and innovation in the country.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "National Technovation Summit 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Technovation Summit 2025",
    description:
      "A 1-day event that aims to bring together DOST-SEI scholars, industry experts, and thought leaders to inspire a collective vision of progress and innovation in the country.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          ${garetBook.variable} ${kagitinganBold.variable} ${monument.variable} ${garetBook.className}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
