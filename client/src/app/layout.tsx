import localFont from "next/font/local";
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
