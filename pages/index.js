import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden ">
			<main>
				<Sidebar />
				<Center />
			</main>
			<div>
				<Player />
			</div>
		</div>
	);
}
