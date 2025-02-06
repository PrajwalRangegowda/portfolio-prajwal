"use client"; // Ensure this is marked as a client component
import styles from "./LoginButton.module.css"; // Corrected typo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle,faRightFromBracket,faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Image from "next/image";
import {  signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div className={styles.containerProfile}>
    <div >
      {session ? (
        <div className={styles.profileSection}>
        <p>{session.user?.email ?? "User@gmail.com"}</p>
            <Image
              src={session.user?.image ?? "/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.profileSectionUser}
            />
            <p>{`Hi! ${session.user?.name.split(" ")[0] ?? "User@gmail.com"}`}</p>
          <button onClick={() => signOut()} className={styles.buttonRed}> <FontAwesomeIcon icon={faRightFromBracket} size="sm" />&nbsp;Sign Out
          </button>
          <Link href="/api/auth/signin" className={styles.buttonRed}><FontAwesomeIcon icon={faShuffle} size="sm"/>&nbsp;Switch Account
          </Link>
        </div>
      ) : (
        <div className={styles.profileSection}>
            <Image
              src={"/alien-svgrepo-com.png"}
              width={24}
              height={24}
              alt="profile"
              className={styles.profileSectionUser}
            />
          <Link href="/api/auth/signin" className={styles.buttonRed}><FontAwesomeIcon icon={faArrowRightToBracket} size="sm"/>&nbsp;Sign In
          </Link>
          
          
        </div>
      )}
    </div>
    </div>
  );
}
