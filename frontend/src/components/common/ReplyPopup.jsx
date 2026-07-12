import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaReply } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ButtonLoader from "./ButtonLoader";

const ReplyPopup = ({ contactClientData, close, fetchSupportMessage }) => {
	const [loading, setLoading] = useState(false);
	const [reply, setReply] = useState("");

	const handleContactReply = async (e) => {
		e.preventDefault();

		if (!reply.trim()) {
			return toast.error("Reply cannot be empty");
		}

		try {
			setLoading(true);

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/reply`,
				{
					reply,
					contactId: contactClientData._id,
				},
				{
					withCredentials: true,
				},
			);

			toast.success(response.data.message);
			fetchSupportMessage();
			close();
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Something went wrong",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			onClick={close}
			className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]"
			>
				{/* Header */}

				<div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-7 text-center">
					<div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-lg">
						<FaReply className="text-4xl text-indigo-600" />
					</div>

					<h2 className="mt-4 text-2xl font-bold text-white">
						Reply Message
					</h2>

					<p className="mt-2 text-sm text-indigo-100">
						Send a response to the customer.
					</p>
				</div>

				{/* Body */}

				<form
					onSubmit={handleContactReply}
					className="space-y-6 px-8 py-7"
				>
					{/* Receiver */}

					<div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
						<p className="font-semibold text-gray-800">
							{contactClientData?.name}
						</p>

						<p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
							<MdEmail />
							{contactClientData?.email}
						</p>
					</div>

					{/* Reply */}

					<div>
						<label className="mb-2 block font-medium text-gray-700">
							Your Reply
						</label>

						<textarea
							rows={5}
							value={reply}
							onChange={(e) => setReply(e.target.value)}
							placeholder="Write your reply..."
							className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
						/>
					</div>

					{/* Buttons */}

					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={close}
							className="rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
						>
							Cancel
						</button>

						<button
							type="submit"
							disabled={loading}
							className="rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? (
								<ButtonLoader text="Sending" />
							) : (
								<div className="flex items-center gap-2">
									<FaReply />
									Send Reply
								</div>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReplyPopup;
