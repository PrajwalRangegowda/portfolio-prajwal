"use client";
import { Geist, Geist_Mono, Anta } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicGrid from "@/components/DynamicGrid";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anta = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: "400",
});

// To set dark mode

const metadata = {
  title: "Prajwal Rangegowda",
  description: "Generated by create next app",
  icons: { icon: "/favicon.ico?v=2", appleIcon: "/favicon.ico?v=2" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} `}>
            <Header />
            {children}
            <DynamicGrid />
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </SessionProvider>
  );
}
