import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/AdminSidebar";
import { AuthContextProvider } from "@/context/AuthContext";

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
  title: "Admin",
  description: "Admin panel",
};

const RootLayout =({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <div className="w-full flex flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="w-full h-[90%]">
              {children}

              <Toaster />
            </div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
