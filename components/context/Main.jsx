"use client";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallPWA from "../sections/InstallPWA";
import DynamicGrid from "@/components/DynamicGrid";

export default function Main({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Header />
        <InstallPWA />
        {children}
        <DynamicGrid />
        <Footer />
      </AuthProvider>
    </SessionProvider>
  );
}
