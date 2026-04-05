import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaReply } from "react-icons/fa";

const ReplyPopup = ({contactClientData, close, fetchSupportMessage}) => {
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState("")
	async function handleContactReply(e) {
		e.preventDefault()
		try {
			if (!reply) {
				return;
			}
			setLoading(true);
			const data = {
				reply,
				contactId: contactClientData._id,
			};

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/reply`,
				data,
				{ withCredentials: true },
			);
			toast.success(response.data.message)
			setLoading(false);
			fetchSupportMessage()
			close()
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message)
			setLoading(false)
			close()
		}
	}
	
	

	return (
		<div className="fixed top-0 left-0 bg-black/50 inset-0 z-9999 flex justify-center items-center">
			<div className="bg-white p-6 rounded-md w-sm flex flex-col items-center gap-4">
				<h3 className="flex items-center gap-2 text-2xl font-semibold text-green-600">
					<FaReply />
					Reply
				</h3>

				<form onSubmit={handleContactReply} className="w-full">
					<textarea
						type="text"
						placeholder="Reply message..."
						rows={3}
						className="ring-1 ring-primary border-none outline-none focus:ring-2 p-1 rounded-md w-full"
						onChange={(e) => setReply(e.target.value)}
						value={reply}
					/>

					<div className="flex justify-end mt-4">
						<button
							type="submit"
							className="bg-primary text-white px-8 py-2 rounded-md"
						>
							{loading ? "sending..." : "Send"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReplyPopup;
