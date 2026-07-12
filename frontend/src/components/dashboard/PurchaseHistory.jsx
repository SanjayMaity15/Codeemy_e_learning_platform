import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const PurchaseHistory = () => {
	const [history, setHistory] = useState(null);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}payment/purchase-history`,
					{ withCredentials: true },
				);

				setHistory(res.data.data);
			} catch (error) {
				console.log("Failed to fetch purchase history");
			}
		};

		fetchHistory();
	}, []);

	if (!history) {
		return <Loader />;
	}

	if (!history?.length) {
		return (
			<div className="flex items-center justify-center py-24">
				<p className="text-2xl font-semibold text-gray-500">
					No Purchase History Found
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
			<h2 className="text-3xl font-bold font-orbitron text-primary mb-8">
				Purchase History
			</h2>

			<div className="space-y-6">
				{history?.map((item) => (
					<div
						key={item._id}
						className="group flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
					>
						{/* Thumbnail */}
						<div className="overflow-hidden rounded-xl">
							<img
								src={item?.course?.thumbnail}
								alt="course"
								className="h-28 w-44 object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>

						{/* Details */}
						<div className="flex-1 w-full space-y-2">
							<h3 className="text-xl font-semibold text-primary">
								{item?.course?.courseName}
							</h3>

							<div className="space-y-1 text-sm">
								<p className="text-gray-600">
									<span className="font-semibold text-black">
										Order ID:
									</span>{" "}
									{item?.orderId}
								</p>

								<p className="text-gray-600">
									<span className="font-semibold text-black">
										Payment ID:
									</span>{" "}
									{item?.paymentId}
								</p>

								<p className="text-gray-600">
									<span className="font-semibold text-black">
										Purchased On:
									</span>{" "}
									<span className="text-pink-600">
										{new Date(
											item?.createdAt,
										).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "long",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										})}
									</span>
								</p>
							</div>
						</div>

						{/* Price */}
						<div className="flex flex-col items-center md:items-end gap-2">
							<p className="text-sm text-gray-500 uppercase tracking-wide">
								Amount Paid
							</p>

							<p className="text-3xl font-bold text-pink-600">
								₹{item?.amount}
							</p>
						</div>

						{/* Bottom Accent */}
						<div className="absolute bottom-0 left-0 h-1 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PurchaseHistory;
