import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { setToken } from "../../feature/authSlice";
import { setUser } from "../../feature/profileSlice";

export default function DeleteAccount() {
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [confirmationModal, setConfirmationModal] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleDeleteAccount() {
		try {
			setLoading(true);
			const result = await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}profile/deleteProfile`,
				{ withCredentials: true },
			);

			toast.success(result?.data?.message);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			dispatch(setToken(null));
			dispatch(setUser(null));
			setLoading(false);
			navigate("/");
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	}

	return (
		<>
			<div className="my-10 rounded-3xl border border-red-200 bg-linear-to-r from-red-50 via-pink-50 to-red-50 shadow-lg transition-all duration-300 hover:shadow-xl">
				<div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8">
					{/* Icon */}
					<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 shadow-sm">
						<FiTrash2 className="text-3xl text-red-600" />
					</div>

					{/* Content */}
					<div className="flex-1">
						<h2 className="text-2xl font-bold text-red-600">
							Delete Account
						</h2>

						<p className="mt-2 text-sm text-gray-600 leading-relaxed">
							Deleting your account is permanent. All your
							enrolled courses, profile information, purchase
							history, and other associated data will be removed
							permanently.
						</p>

						<div className="mt-4 rounded-xl border border-red-200 bg-white p-4">
							<p className="font-semibold text-red-600 mb-2">
								⚠ This action cannot be undone.
							</p>

							<ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
								<li>
									You will lose access to all purchased
									courses.
								</li>
								<li>Your learning progress will be deleted.</li>
								<li>
									Your profile and account data will be
									removed permanently.
								</li>
							</ul>
						</div>

						<button
							type="button"
							className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg cursor-pointer"
							onClick={() =>
								setConfirmationModal({
									text1: "Do you want to delete this Account ?",
									text2: "Think again if you delete this account you will unenroll from all enrolled courses",
									btn1Text: "Delete",
									btn2Text: "Cancel",
									loadingText: "Deleting...",
									btn1Handler: () => handleDeleteAccount(),
									btn2Handler: () =>
										setConfirmationModal(null),
								})
							}
						>
							I want to delete my account
						</button>
					</div>
				</div>
			</div>

			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</>
	);
}
