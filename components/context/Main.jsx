"use client";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicGrid from "@/components/DynamicGrid";

export default function Main({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Header />
        {children}
        <DynamicGrid />
        <Footer />
      </AuthProvider>
    </SessionProvider>
  );
}
