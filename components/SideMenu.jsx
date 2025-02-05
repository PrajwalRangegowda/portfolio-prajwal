"use client";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import styles from "./Header.module.css";


export default function SideMenu() {
  const { data: session } = useSession(); // Get session info

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/design">Design</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="https://blog.prajwalrangegowda.com">Blog</a>
        </li>
        {session && ( // Only show "Admin" if the user is logged in
          <li>
            <a href="/protected">Admin</a>
          </li>
        )}
        <li>
          <LoginButton />
          
        </li>
      </ul>
    </nav>
  );
}
