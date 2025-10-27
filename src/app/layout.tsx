import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./theme-provider";

export const metadata: Metadata = {
  title: "ChicCart - Discover Your Signature Style",
  description: "Explore our curated collections of elegant dresses, captivating perfumes, and trendy shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
