import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	session: { 
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // Update session every 24 hours
	},
	cookies: {
		sessionToken: {
			name: process.env.NODE_ENV === 'production' 
				? `__Secure-next-auth.session-token` 
				: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				domain: process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN 
					? process.env.COOKIE_DOMAIN 
					: undefined,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 30 * 24 * 60 * 60 // 30 days
			}
		},
		callbackUrl: {
			name: process.env.NODE_ENV === 'production' 
				? `__Secure-next-auth.callback-url` 
				: `next-auth.callback-url`,
			options: {
				sameSite: 'lax',
				path: '/',
				domain: process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN 
					? process.env.COOKIE_DOMAIN 
					: undefined,
				secure: process.env.NODE_ENV === 'production'
			}
		},
		csrfToken: {
			name: process.env.NODE_ENV === 'production' 
				? `__Host-next-auth.csrf-token` 
				: `next-auth.csrf-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production'
			}
		}
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
			authorization: {
				params: {
					access_type: "offline",
					prompt: "consent",
					scope: [
						"openid",
						"email",
						"profile",
					].join(" ")
				}
			}
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				(session.user as { id?: string }).id = token.sub;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
};

export default authOptions;

