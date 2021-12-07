import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
	"playlist-read-private",
	"playlist-read-collaborative",
	"streaming",
	"user-read-email",
	"user-read-private",
	"user-library-read",
	"user-top-read",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-follow-read",
].join(",");

const params = {
	scope: scopes,
};

const queryParams = new URLSearchParams(params).toString();

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParams.toString();

const SpotifyApi = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_ID,
	clientSecret: process.env.NEXT_PUBLIC_SECRET,
});

export default SpotifyApi;

export { LOGIN_URL };
