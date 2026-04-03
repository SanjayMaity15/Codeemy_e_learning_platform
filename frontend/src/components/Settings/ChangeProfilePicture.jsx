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
		// console.log(file)
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
			console.log("uploading...");
			setLoading(true);
			const formData = new FormData();
			formData.append("displayPicture", imageFile);
			// console.log("formdata", formData)

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
		<>
			<div className="flex items-center justify-between rounded-md  bg-white shadow-sm p-8 px-12">
				<div className="flex flex-col md:flex-row items-center gap-x-4">
					<img
						src={previewSource || user?.image}
						alt={`profile-${user?.firstName}`}
						className="aspect-square w-12 md:w-19.5 rounded-full object-cover"
					/>
					<div className="space-y-2">
						<p className="text-center md:text-left">
							Change Profile Picture
						</p>
						<div className="flex flex-row gap-3">
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
								className="cursor-pointer rounded-md bg-pink-600 py-2 px-5 font-semibold text-white"
							>
								Select
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
							>
								{!loading && (
									<FiUpload className="text-lg text-richblack-900" />
								)}
							</IconBtn>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
