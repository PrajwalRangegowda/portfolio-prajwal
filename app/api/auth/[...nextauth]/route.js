import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser } from "@/lib/userService"; // Assuming you have the `createUser` function

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      client: { token_endpoint_auth_method: "client_secret_post" },
      scope: "r_liteprofile r_emailaddress",
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "profile email openid",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 1️⃣ Fetch user from the database
        const user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new Error("No user found with this email");
        }

        // 2️⃣ Validate password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        // 3️⃣ Return user object
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signup: '/auth/signup',
    error: '/auth/signup',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', user, account, profile);
      
      // Check if the user exists in the database
      const existingUser = await getUserByEmail(user.email);
      if (!existingUser) {
        // If user doesn't exist, create a new user in the database
        await createUser(user.name, user.email, "defaultpassword123"); // You can set a default password or prompt user to set one later
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirecting to:', url);
      return baseUrl;
    },
    async jwt({ token, account }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
