import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setUser } from "../../feature/profileSlice";
import { setToken } from "../../feature/authSlice";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
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
				{ withCredentials: true },
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
			console.log("Logout failed", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed min-h-screen top-0 left-0 min-w-screen inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-xs">
			{/* Modal */}
			<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-fadeIn">
				{/* Icon */}
				<div className="flex justify-center mb-5">
					<div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
						<FiLogOut className="text-[--color-primary] text-xl" />
					</div>
				</div>

				{/* Heading */}
				<h2 className="text-xl font-bold text-center text-gray-900 mb-2">
					Are you sure?
				</h2>

				<p className="text-center text-gray-500 mb-6">
					Do you really want to logout from your account?
				</p>

				{/* Buttons */}
				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
					>
						Cancel
					</button>

					<button
						onClick={handleLogout}
						disabled={loading}
						className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
					>
						{loading ? <ButtonLoader text="Logging out"/> : "Logout"}
					</button>
				</div>
			</div>
		</div>
	);
}
