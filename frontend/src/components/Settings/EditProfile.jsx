import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import axios from "axios";
import { setUser } from "../../feature/profileSlice";
import { useState } from "react";
import ButtonLoader from "../common/ButtonLoader";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitProfileForm = async (data) => {
		try {
			setLoading(true);
			const result = await axios.put(
				`${import.meta.env.VITE_SERVER_URL}profile/updateProfile`,
				data,
				{ withCredentials: true },
			);

			dispatch(setUser(result.data.user));

			localStorage.setItem("user", JSON.stringify(result.data.user));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log("ERROR MESSAGE - ", error.message);
		}
	};
	return (
		<div className="mx-auto max-w-6xl">
			{/* Header */}
		

			<form onSubmit={handleSubmit(submitProfileForm)} className="pt-8">
				<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
					<div className="mb-8 flex items-center justify-between border-b pb-5">
						<div>
							<h2 className="text-2xl font-bold text-gray-800">
								Profile Information
							</h2>

							<p className="mt-1 text-sm text-gray-500">
								Update your personal details.
							</p>
						</div>

						<div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
							Personal Info
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{/* First Name */}

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								First Name
							</label>

							<input
								{...register("firstName", { required: true })}
								defaultValue={user?.firstName}
								placeholder="John"
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							/>

							{errors.firstName && (
								<p className="mt-2 text-sm text-red-500">
									Please enter your first name.
								</p>
							)}
						</div>

						{/* Last Name */}

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								Last Name
							</label>

							<input
								{...register("lastName", { required: true })}
								defaultValue={user?.lastName}
								placeholder="Doe"
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							/>

							{errors.lastName && (
								<p className="mt-2 text-sm text-red-500">
									Please enter your last name.
								</p>
							)}
						</div>

						{/* DOB */}

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								Date of Birth
							</label>

							<input
								type="date"
								{...register("dateOfBirth", {
									required: {
										value: true,
										message:
											"Please enter your Date of Birth.",
									},
									max: {
										value: new Date()
											.toISOString()
											.split("T")[0],
										message:
											"Date of Birth cannot be in the future.",
									},
								})}
								defaultValue={
									user?.additionalDetails?.dateOfBirth
								}
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							/>

							{errors.dateOfBirth && (
								<p className="mt-2 text-sm text-red-500">
									{errors.dateOfBirth.message}
								</p>
							)}
						</div>

						{/* Gender */}

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								Gender
							</label>

							<select
								{...register("gender", { required: true })}
								defaultValue={user?.additionalDetails?.gender}
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							>
								{genders.map((gender, index) => (
									<option key={index} value={gender}>
										{gender}
									</option>
								))}
							</select>
						</div>

						{/* Contact */}

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								Contact Number
							</label>

							<input
								type="tel"
								placeholder="9876543210"
								{...register("contactNumber", {
									required: {
										value: true,
										message:
											"Please enter your Contact Number.",
									},
									maxLength: {
										value: 12,
										message: "Invalid Contact Number",
									},
									minLength: {
										value: 10,
										message: "Invalid Contact Number",
									},
								})}
								defaultValue={
									user?.additionalDetails?.contactNumber
								}
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							/>

							{errors.contactNumber && (
								<p className="mt-2 text-sm text-red-500">
									{errors.contactNumber.message}
								</p>
							)}
						</div>

						{/* About */}

						<div className="md:col-span-2">
							<label className="mb-2 block text-sm font-semibold text-gray-700">
								About
							</label>

							<textarea
								rows={5}
								placeholder="Tell us something about yourself..."
								{...register("about", { required: true })}
								defaultValue={user?.additionalDetails?.about}
								className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-indigo-500 focus:bg-white focus:outline-none"
							/>

							{errors.about && (
								<p className="mt-2 text-sm text-red-500">
									Please enter your bio.
								</p>
							)}
						</div>
					</div>

					{/* Buttons */}

					<div className="mt-10 flex flex-col-reverse gap-4 border-t pt-6 sm:flex-row sm:justify-end">
						<button
							type="button"
							onClick={() => navigate("/dashboard/my-profile")}
							className="rounded-xl border border-red-500 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-50"
						>
							Cancel
						</button>

						<IconBtn
							type="submit"
							loading={loading}
							text="Save Changes"
							customClasses="rounded-xl px-8 py-3"
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
