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
		<section className="min-h-screen space-y-8 rounded-3xl bg-linear-to-br from-slate-50 via-white to-pink-50 p-6 md:p-8">
			{/* Header */}
			<div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
				<h2 className="text-4xl font-bold text-primary">
					Support Messages
				</h2>

				<p className="mt-2 text-gray-500">
					View, manage and reply to student support requests.
				</p>
			</div>

			{/* Cards */}
			<div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{supportMsg?.length > 0 ? (
					supportMsg.map((msg) => (
						<div
							key={msg._id}
							className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div>
								{/* Name */}
								<h3 className="text-xl font-bold text-primary">
									{msg.name}
								</h3>

								{/* Email */}
								<p className="mt-1 break-all text-sm text-gray-500">
									{msg.email}
								</p>

								{/* Message */}
								<details className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
									<summary className="cursor-pointer font-semibold text-gray-700">
										{msg.message}
									</summary>

									{msg.reply && (
										<div className="mt-4 rounded-xl bg-indigo-50 p-3">
											<p className="text-sm font-semibold text-primary">
												Reply
											</p>

											<p className="mt-1 text-sm text-gray-600">
												{msg.reply}
											</p>
										</div>
									)}
								</details>

								{/* Date */}
								<p className="mt-5 text-xs font-medium text-gray-400">
									{formatDate(msg.createdAt)}
								</p>
							</div>

							{/* Button */}
							<div className="mt-6 flex justify-end">
								{msg.reply ? (
									<button
										className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-100 px-5 py-2 font-semibold text-green-700 transition hover:bg-green-200"
										onClick={() =>
											toast.success("Already replied")
										}
									>
										<SiTicktick />
										Replied
									</button>
								) : (
									<button
										className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2 font-semibold text-white transition hover:opacity-90"
										onClick={() =>
											setContactClientData(msg)
										}
									>
										<FaReply />
										Reply
									</button>
								)}
							</div>
						</div>
					))
				) : (
					<div className="col-span-full rounded-3xl bg-white py-20 text-center shadow-lg border border-gray-100">
						<p className="text-xl font-semibold text-gray-500">
							No support messages found
						</p>

						<p className="mt-2 text-gray-400">
							New contact requests will appear here.
						</p>
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
