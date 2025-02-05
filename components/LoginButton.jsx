"use client"; // Ensure this is marked as a client component
import styles from "./LoginButton.module.css"; // Corrected typo
import Image from "next/image";
import {  signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      {session ? (
        <>
          <button onClick={() => signOut()} className={styles.buttonRed}>
            <Image
              src={session.user?.image ?? "/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.userAvatar}
            />
          </button>
        </>
      ) : (
        <>
          <Link href="/api/auth/signin" className={styles.buttonBlue}>
            <Image
              src={"/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.userAvatar}
            />
          </Link>
          
        </>
      )}
    </div>
  );
}
