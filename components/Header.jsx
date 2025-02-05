"use client";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { SessionProvider, getSession } from "next-auth/react";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoHeight, setLogoHeight] = useState(35);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        console.log("No active session, redirecting to login...");
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session) {
        localStorage.setItem("sessionData", JSON.stringify(session));
      } else {
        localStorage.removeItem("sessionData");
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
        setLogoHeight(20);
      } else {
        setScrolled(false);
        setLogoHeight(35);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SessionProvider>
      <header className={`${scrolled ? styles.scrolled : styles.header}`}>
        <motion.div
          className={styles.siteLogo}
          initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
          animate={{ opacity: 1 }} // Animate to opacity 1 (visible)
          transition={{ duration: 1 }} // Duration of the fade-in
        >
          <Link href={"/"}>
            <Image
              className={`${styles.logo} ${styles.logoDark}`}
              src="/prajwal-logo-dark.png"
              alt="Prajwal logomark"
              width={logoHeight}
              height={logoHeight}
            />
            <Image
              className={`${styles.logo} ${styles.logoLight}`}
              src="/prajwal-logo-light.png"
              alt="Prajwal logomark"
              width={logoHeight}
              height={logoHeight}
            />
          </Link>
          <Link
            className={`${
              scrolled ? styles.sitetitleScrolled : styles.sitetitle
            }`}
            href={"/"}
          >
            Prajwal Rangegowda
          </Link>
        </motion.div>

        <SideMenu />
        
      </header>
    </SessionProvider>
  );
}
