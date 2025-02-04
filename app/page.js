"use client";

import styles from "./page.module.css";
import IntroSection from "../components/IntroSection";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <IntroSection/>
        {/* this is comment */}
      </main>
    </div>
  );
}
