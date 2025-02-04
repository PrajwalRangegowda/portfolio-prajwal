"use client"; // Ensure this is marked as a client component
import styles from "./LoginButton.module.css"; // Corrected typo
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";


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
          
          <button
            onClick={() => signIn("google")}
            className={styles.buttonBlue}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              width="20"
              height="20"
              fill="black"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            
          </button>
        </>
      )}
    </div>
  );
}
