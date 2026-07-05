import { useState } from "react";
import { IoClose } from "react-icons/io5";

import ChatMessage from "./ChatMessage";
import Typing from "./Typing";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function ChatWindow({ close }) {
	const [messages, setMessages] = useState([
		{
			sender: "bot",
			text: "Hi 👋 I'm Codeemy AI. How can I help you today?",
		},
    ]);
    const bottomRef = useRef(null);

	const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);
    
    const sendMessage = async () => {
		if (!input.trim()) return;

		const userMessage = {
			sender: "user",
			text: input,
		};

		setMessages((prev) => [...prev, userMessage]);

		const currentMessage = input;

		setInput("");

		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}chatbot/chat`,
				{
					message: currentMessage,
				},
				{
					withCredentials: true,
				},
			);

			setMessages((prev) => [
				...prev,
				{
					sender: "bot",
					text: response.data.reply,
				},
			]);
		} catch (error) {
			console.log(error);

			setMessages((prev) => [
				...prev,
				{
					sender: "bot",
					text: "Something went wrong. Please try again.",
				},
			]);
		} finally {
			setLoading(false);
		}
    };
    
    useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages, loading]);

	return (
		<div className="fixed bottom-24 top-20 right-6 z-1000 flex h-100 w-95 flex-col rounded-xl bg-white shadow-2xl">
			<div className="flex items-center justify-between bg-indigo-600 p-4 text-white rounded-t-xl">
				<h2 className="font-semibold">Codeemy Assistant</h2>

				<button onClick={close}>
					<IoClose size={24} />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto p-4 font-inter">
				{messages.map((msg, index) => (
					<ChatMessage
						key={index}
						sender={msg.sender}
						text={msg.text}
					/>
				))}

				{loading && <Typing />}

				<div ref={bottomRef}></div>
			</div>

			<div className="border-t p-3 flex gap-2">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							sendMessage();
						}
					}}
					className="flex-1 rounded-lg font-inter text-pink-600 px-3 py-2 outline-2 outline-blue-600 bg-blue-300"
					placeholder="Ask something..."
				/>

				<button
					onClick={sendMessage}
					disabled={loading}
					className="rounded-lg bg-indigo-600 px-4 text-white disabled:opacity-50 cursor-pointer"
				>
					{loading ? "..." : "Send"}
				</button>
			</div>
		</div>
	);
}
