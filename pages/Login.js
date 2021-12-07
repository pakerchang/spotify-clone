import React from "react";
import { getProviders } from "next-auth/react";

export default function Login({ providers }) {
	return (
		<div>
			<img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="spotify-icon" />
		</div>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: {
			providers,
		},
	};
}
