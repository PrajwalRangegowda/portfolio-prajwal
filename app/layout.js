
import { Geist, Geist_Mono, Anta } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";


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
  weight: "400"
});

// To set dark mode


export const metadata = {
  title: "Prajwal Rangegowda",
  description: "Generated by create next app",
  icons: { icon: "/favicon.ico?v=2" },
  manifest: "/manifest.json",
  
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        <Header />
        {children}
          <Footer/>
      </body>
    </html>
  );
}
