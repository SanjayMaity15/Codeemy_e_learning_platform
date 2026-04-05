import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormatter";
import { FaReply } from "react-icons/fa";
import ReplyPopup from "../common/ReplyPopup";
import { SiTicktick } from "react-icons/si";
import toast from "react-hot-toast";

const Support = () => {
    const [supportMsg, setSupportMsg] = useState([]);
    const [contactClientData, setContactClientData] = useState(null)

	async function fetchSupportMessage() {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}contact/getContacts`,
				{ withCredentials: true },
			);

			setSupportMsg(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchSupportMessage();
	}, []);

	return (
		<section className="min-h-screen bg-gray-100">
			{/* Header */}
			<div className="max-w-6xl mx-auto mb-8">
				<h2 className="text-3xl font-bold text-gray-800">
					📩 Contact Messages
				</h2>
				<p className="text-gray-500 mt-1">
					Manage and view user queries
				</p>
			</div>

			{/* Messages Grid */}
			<div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{supportMsg?.length > 0 ? (
					supportMsg.map((msg) => (
						<div
							key={msg._id}
							className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300 border border-gray-200"
						>
							{/* Name */}
							<h3 className="text-lg font-semibold text-indigo-600">
								{msg.name}
							</h3>

							{/* Email */}
							<p className="text-sm text-gray-500 mb-2">
								{msg.email}
							</p>

							<details className="bg-gray-50 text-sm rounded-lg p-3 cursor-pointer">
								<summary className="font-semibold">
									{msg.message}
								</summary>

								{msg.reply && (
									<p className="mt-2 text-sm text-indigo-600">
										<span className="font-semibold">
											Reply:
										</span>{" "}
										<span className="text-gray-500">{msg.reply}</span>
									</p>
								)}
							</details>

							{/* Date */}
							<div className="text-xs text-gray-400">
								{formatDate(msg.createdAt)}
							</div>

							<div className="w-full flex justify-end">
								{msg.reply ? (
									<button
										className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-1 rounded-md cursor-pointer text-sm"
										onClick={(e) =>
											toast.success("Already replied")
										}
									>
										<SiTicktick />
										replied
									</button>
								) : (
									<button
										className="flex items-center gap-1 bg-green-600 text-white px-4 py-1 rounded-md cursor-pointer text-sm"
										onClick={(e) =>
											setContactClientData(msg)
										}
									>
										<FaReply />
										reply
									</button>
								)}
							</div>
						</div>
					))
				) : (
					<div className="col-span-full text-center text-gray-500 text-lg">
						No messages found 😔
					</div>
				)}
			</div>

			{contactClientData && (
				<ReplyPopup
					contactClientData={contactClientData}
					fetchSupportMessage={fetchSupportMessage}
					close={() => setContactClientData(null)}
				/>
			)}
		</section>
	);
};

export default Support;
