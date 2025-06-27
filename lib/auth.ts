import { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: AuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.email = user.email;
      }
// stored role value on app_metadata is fast and ideal for most stateless auth use-cases.
// It's embedded in the token during login, eliminating the need for extra DB lookups.
// However, storing roles in a database has its own advantages:
//
// - Dynamic Role Updates: Roles can be updated instantly without requiring a re-login.
// - Fine-grained Access Control: Enables more complex role hierarchies or permission models.
// - Auditing & Admin Control: Easier to manage, audit, or assign roles from an internal admin panel.
// - Separation of Concerns: Keeps authorization logic within business logic layer (backend).
// - Centralized Control: If multiple identity providers or systems are involved, DB can act as the single source of truth.
//
// Overall: app_metadata is ideal for performance and simplicity;
// database storage is better for flexibility, real-time updates, and complex business rules.
      if (profile) {
        const namespace = `${process.env.AUTH0_ROLE_CLAIM_NAMESPACE}/role`;
        const role =
          typeof profile[namespace as keyof typeof profile] === "string"
            ? profile[namespace as keyof typeof profile]
            : "user";
        token.role = role;
      }
      console.log("token after",token)
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          picture: token.picture,
          role: token.role,
        },
        accessToken: token.accessToken,
      };
    },
  },
};
