import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { db } from '@/lib/db';

// Extend the built-in types for NextAuth
declare module "next-auth" {
  interface User {
    role: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('DEBUG: NextAuth authorize called with credentials:', { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('DEBUG: Missing credentials');
          throw new Error('Invalid credentials');
        }

        // Temporary hardcoded authentication for testing
        if (credentials.email === 'admin@taxbooking.com' && credentials.password === 'admin123') {
          console.log('DEBUG: Authentication successful for test admin user');
          return {
            id: 'test-admin-id',
            email: 'admin@taxbooking.com',
            role: 'admin',
            name: 'Test Admin'
          };
        }

        // For demonstration, also accept test@example.com
        if (credentials.email === 'test@example.com' && credentials.password === 'testpassword') {
          console.log('DEBUG: Authentication successful for test user');
          return {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'admin',
            name: 'Test User'
          };
        }

        // Add user's email for testing
        if (credentials.email === 'kabalip8@gmail.com' && credentials.password === 'password') {
          console.log('DEBUG: Authentication successful for user kabalip8@gmail.com');
          return {
            id: 'kabalip8-user-id',
            email: 'kabalip8@gmail.com',
            role: 'admin',
            name: 'Kabalip User'
          };
        }

        console.log('DEBUG: Authentication failed - invalid credentials for email:', credentials.email);
        throw new Error('Invalid credentials');
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.role) {
        token.role = user.role as string;
        console.log('DEBUG: JWT callback - setting role:', user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.role) {
        session.user.role = token.role;
        console.log('DEBUG: Session callback - user role:', token.role);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('DEBUG: NextAuth redirect callback - url:', url, 'baseUrl:', baseUrl);
      
      // Redirect to dashboard after successful login
      if (url.startsWith(baseUrl)) {
        if (url === `${baseUrl}/login` || url === baseUrl) {
          console.log('DEBUG: Redirecting to dashboard after login');
          return `${baseUrl}/dashboard`;
        }
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };