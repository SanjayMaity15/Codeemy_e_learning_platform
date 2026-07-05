import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatWindow from "./ChatWindow";

export default function ChatBot() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setOpen(!open)}
				className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:scale-110 transition hover:cursor-pointer"
			>
				<FaRobot size={28} />
			</button>

			{open && <ChatWindow close={() => setOpen(false)} />}
		</>
	);
}
