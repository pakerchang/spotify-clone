import NextAuth from "next-auth";
import SpotifyProviders from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
	// Interval time to update access token
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshAccessToken);

		const { body: refreshToken } = await spotifyApi.refreshAccessToken();
		return {
			...token,
			accessToken: refreshToken.access_token,
			accessTokenExpires: Date.now + refreshToken.expires_in * 1000,
			refreshToken: refreshToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.log(error);
		return { ...token, error: "RefreshAccessTokenError" };
	}
}

// login function route:
// login page > spotify provider > spotify login page > verify token > callback (return) > home page

export default NextAuth({
	providers: [
		SpotifyProviders({
			// set client id and secret key
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,

	pages: {
		// set login page route
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }) {
			// use callback function with jwt access return token type
			if (account && user)
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			if (Date.now() < token.accessTokenExpires) {
				console.log("existing access token is valid");
				return token;
			}
			console.log("access token has expired, refreshing ");
			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
