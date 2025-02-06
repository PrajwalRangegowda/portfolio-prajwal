"use client"; // Ensure this is marked as a client component
import styles from "./LoginButton.module.css"; // Corrected typo


import Image from "next/image";
import {useSession } from "next-auth/react";


export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div >
    <div className={styles.container}>
      {session ? (
        <>
          
            <Image
              src={session.user?.image ?? "/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.userAvatar}
            />
          
        </>
      ) : (
        <>
          
            <Image
              src={"/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.userAvatar}
            />
          
          
        </>
      )}
    </div>
    </div>
  );
}
