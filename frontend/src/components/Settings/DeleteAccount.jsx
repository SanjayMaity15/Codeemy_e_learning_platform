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
			console.log("ERROR MESSAGE - ", error.message);
		}
	}

	return (
		<>
			<div className="my-10 flex flex-col gap-4 md:flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-600 p-8 md:px-12">
				<div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-red-400">
					<FiTrash2 className="text-2xl md:text-3xl text-pink-200" />
				</div>
				<div className="flex flex-col space-y-2">
					<h2 className="text-lg font-semibold text-white">
						Delete Account
					</h2>
					<div className="text-gray-200 text-xs md:text-sm">
						<p>Would you like to delete account?</p>
						<p>
							This account may contain Paid Courses. Deleting your
							account is permanent and will remove all the contain
							associated with it.
						</p>
					</div>
					<button
						type="button"
						className="w-fit cursor-pointer italic text-yellow-300"
						onClick={() =>
							setConfirmationModal({
								text1: "Do you want to delete this Account ?",
								text2: "Think again if you delete this account you will unenroll from all enrolled courses",
								btn1Text: "Delete",
								btn2Text: "Cancel",
								loadingText: "Deleting...",
								btn1Handler: () => handleDeleteAccount(),

								btn2Handler: () => setConfirmationModal(null),
							})
						}
					>
						I want to delete my account.
					</button>
				</div>
			</div>
			{confirmationModal && (
				<ConfirmationModal modalData={confirmationModal} />
			)}
		</>
	);
}
