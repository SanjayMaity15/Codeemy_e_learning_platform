import ReactMarkdown from "react-markdown";

export default function ChatMessage({ sender, text }) {
	const isUser = sender === "user";

	return (
		<div
			className={`flex text-left ${isUser ? "justify-end" : "justify-start"} mb-3`}
		>
			<div
				className={`max-w-[80%] rounded-xl px-4 py-3 ${
					isUser
						? "bg-indigo-500 text-white"
						: "bg-gray-100 text-black"
				}`}
			>
				<div className="leading-7 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:my-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_strong]:font-bold">
					<ReactMarkdown>{text}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
