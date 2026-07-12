import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import IconBtn from "../common/IconBtn";
import axios from "axios";
import { setUser } from "../../feature/profileSlice";
import ButtonLoader from "../common/ButtonLoader";

export default function ChangeProfilePicture() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [previewSource, setPreviewSource] = useState(null);

	const fileInputRef = useRef(null);

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			setImageFile(file);
			previewFile(file);
		}
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const handleFileUpload = async () => {
		try {
			setLoading(true);

			const formData = new FormData();
			formData.append("displayPicture", imageFile);

			const result = await axios.put(
				`${import.meta.env.VITE_SERVER_URL}profile/updateDisplayPicture`,
				formData,
				{ withCredentials: true },
			);

			dispatch(setUser(result.data.updatedProfile));

			localStorage.setItem(
				"user",
				JSON.stringify(result.data.updatedProfile),
			);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("ERROR MESSAGE - ", error.message);
		}
	};

	useEffect(() => {
		if (imageFile) {
			previewFile(imageFile);
		}
	}, [imageFile]);

	return (
		<div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">

			
			<div className="flex flex-col md:flex-row items-center justify-between gap-6">
				<div className="flex flex-col sm:flex-row items-center gap-5">
					<img
						src={previewSource || user?.image}
						alt={`profile-${user?.firstName}`}
						className="w-24 h-24 rounded-full object-cover border-4 border-pink-100 shadow-md"
					/>

					<div>
						<h3 className="text-xl font-semibold text-gray-800 text-center md:text-left">
							Profile Picture
						</h3>

						<p className="text-sm text-gray-500 mt-1 text-center md:text-left">
							Upload a new profile picture. PNG, JPG or GIF
							supported.
						</p>

						<div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
								className="hidden"
								accept="image/png, image/gif, image/jpeg"
							/>

							<button
								onClick={handleClick}
								disabled={loading}
								className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition cursor-pointer disabled:opacity-60"
							>
								Select Image
							</button>

							<IconBtn
								text={
									loading ? (
										<ButtonLoader text={"Uploading"} />
									) : (
										"Upload"
									)
								}
								onclick={handleFileUpload}
								customClasses="rounded-xl px-6"
							>
								{!loading && (
									<FiUpload className="text-lg text-white" />
								)}
							</IconBtn>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
