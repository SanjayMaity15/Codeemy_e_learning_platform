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
		// console.log("Form Data - ", data)
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
		<>
			<form onSubmit={handleSubmit(submitProfileForm)}>
				{/* Profile Information */}
				<div className="my-10 flex flex-col gap-y-6 rounded-md  bg-white shadow-sm p-8 px-12">
					<h2 className="text-lg font-semibold">
						Profile Information
					</h2>
					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="firstName"
								className="lable-style text-sm"
							>
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								placeholder="Enter first name"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
								{...register("firstName", { required: true })}
								defaultValue={user?.firstName}
							/>
							{errors.firstName && (
								<span className="-mt-1 text-[12px] text-red-600">
									Please enter your first name.
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="lastName"
								className="lable-style text-sm"
							>
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Enter first name"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
								{...register("lastName", { required: true })}
								defaultValue={user?.lastName}
							/>
							{errors.lastName && (
								<span className="-mt-1 text-[12px] text-red-600">
									Please enter your last name.
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="dateOfBirth"
								className="lable-style text-sm"
							>
								Date of Birth
							</label>
							<input
								type="date"
								name="dateOfBirth"
								id="dateOfBirth"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
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
							/>
							{errors.dateOfBirth && (
								<span className="-mt-1 text-[12px] text-red-600">
									{errors.dateOfBirth.message}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="gender"
								className="lable-style text-sm"
							>
								Gender
							</label>
							<select
								type="text"
								name="gender"
								id="gender"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
								{...register("gender", { required: true })}
								defaultValue={user?.additionalDetails?.gender}
							>
								{genders.map((ele, i) => {
									return (
										<option key={i} value={ele}>
											{ele}
										</option>
									);
								})}
							</select>
							{errors.gender && (
								<span className="-mt-1 text-[12px] text-red-600">
									Please enter your Date of Birth.
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="contactNumber"
								className="lable-style text-sm"
							>
								Contact Number
							</label>
							<input
								type="tel"
								name="contactNumber"
								id="contactNumber"
								placeholder="Enter Contact Number"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
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
							/>
							{errors.contactNumber && (
								<span className="-mt-1 text-[12px] text-red-600">
									{errors.contactNumber.message}
								</span>
							)}
						</div>
						<div className="flex flex-col gap-2 lg:w-[48%]">
							<label
								htmlFor="about"
								className="lable-style text-sm"
							>
								About
							</label>
							<input
								type="text"
								name="about"
								id="about"
								placeholder="Enter Bio Details"
								className="form-style border p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
								{...register("about", { required: true })}
								defaultValue={user?.additionalDetails?.about}
							/>
							{errors.about && (
								<span className="-mt-1 text-[12px] text-red-600">
									Please enter your About.
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<button
						onClick={() => {
							navigate("/dashboard/my-profile");
						}}
						className="cursor-pointer rounded-md bg-red-500 py-2 px-5 font-semibold text-white"
					>
						Cancel
					</button>

					<IconBtn
						type="submit"
						text={
							loading ? <ButtonLoader text={"Saving"} /> : "Save"
						}
					/>
				</div>
			</form>
		</>
	);
}
