import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drive Clone - Secure File Storage & Sharing",
  description:
    "A modern, secure file storage and sharing platform built with Next.js and TypeScript.",
  keywords: [
    "file storage",
    "cloud storage",
    "file sharing",
    "drive clone",
    "nextjs",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "Drive Clone - Secure File Storage & Sharing",
    description: "A modern, secure file storage and sharing platform.",
    siteName: "Drive Clone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drive Clone - Secure File Storage & Sharing",
    description: "A modern, secure file storage and sharing platform.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
