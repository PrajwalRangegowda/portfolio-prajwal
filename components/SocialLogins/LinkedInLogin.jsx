import { signIn, useSession, } from "next-auth/react";


export default function SignInButton() {
  
 

  return (
    <button onClick={() => signIn("linkedin")}>
      Sign in with LinkedIn
     
    </button>
  );
}
