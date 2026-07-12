import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createPortal } from "react-dom";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";

import { setUser } from "../../feature/profileSlice";
import { setToken } from "../../feature/authSlice";
import ButtonLoader from "../common/ButtonLoader";

export default function Logout({ onClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);

		try {
			const result = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}auth/logout`,
				{},
				{
					withCredentials: true,
				},
			);

			if (result.status === 200) {
				dispatch(setUser(null));
				dispatch(setToken(null));

				localStorage.removeItem("user");
				localStorage.removeItem("token");
			}

			toast.success("Logout successfully");
			navigate("/");
		} catch (error) {
			toast.error("Failed to logout");
		} finally {
			setLoading(false);
		}
	};

	return createPortal(
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
			<div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]">
				{/* Header */}
				<div className="bg-linear-to-r from-red-500 via-pink-500 to-orange-500 px-8 py-8 text-center">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
						<FiLogOut className="text-4xl text-red-500" />
					</div>

					<h2 className="mt-5 text-2xl font-bold text-white">
						Logout
					</h2>

					<p className="mt-2 text-sm text-red-100">
						You're about to sign out.
					</p>
				</div>

				{/* Body */}

				<div className="px-8 py-7">
					<div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
						<IoWarningOutline className="mt-0.5 text-2xl text-yellow-500" />

						<div>
							<h4 className="font-semibold text-gray-800">
								Are you sure?
							</h4>

							<p className="mt-1 text-sm leading-6 text-gray-500">
								You will be logged out of your account. You'll
								need to sign in again to continue accessing your
								dashboard.
							</p>
						</div>
					</div>

					<div className="flex justify-end gap-4">
						<button
							onClick={onClose}
							className="rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
						>
							Cancel
						</button>

						<button
							onClick={handleLogout}
							disabled={loading}
							className="rounded-xl bg-red-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
						>
							{loading ? (
								<ButtonLoader text="Logging out" />
							) : (
								<div className="flex items-center gap-2">
									<FiLogOut />
									Logout
								</div>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
