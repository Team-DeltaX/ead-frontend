import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Online Store",
  description: "An online store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <NavBar /> {/* Show NavBar globally, except in /auth pages */}
        </div>
        <div className="w-full">{children}</div>
        <div>
          <Footer /> {/* Show Footer globally, except in /auth pages */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
