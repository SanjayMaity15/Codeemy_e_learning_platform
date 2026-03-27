import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock, FiEye } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../common/ButtonLoader";


export default function ChangePassword() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [showPassword3, setShowPassword3] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

	const validateForm = () => {
		const newErrors = {};
		if (!oldPassword) newErrors.oldPassword = "Old password is required";
		if (!newPassword) {
			newErrors.newPassword = "New password is required";
		} else if (newPassword.length < 6) {
			newErrors.newPassword = "Password must be at least 6 characters";
		}
		if (!confirmNewPassword) {
			newErrors.confirmNewPassword = "Confirm password is required";
		} else if (newPassword !== confirmNewPassword) {
			newErrors.confirmNewPassword = "Passwords do not match";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setLoading(true);
			const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/changepassword`,{
				oldPassword,
				newPassword,
				confirmNewPassword,
            }, { withCredentials: true });
            
			toast.success(response.data.message);
            navigate("/")
			setOldPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
			setErrors({});
		} catch (error) {
			setErrors({
				server:
					error.response?.data?.message ||
					"Failed to update password",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center px-4">
			<div className="w-full max-w-md px-6 border border-primary bg-white shadow-md my-6 py-6 rounded-2xl">
				{/* Icon */}
				<div className="flex justify-center mb-6">
					<div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
						<FiLock className="text-primary text-xl" />
					</div>
				</div>

				{/* Heading */}
				<h1 className="text-3xl font-bold text-primary text-center">
					Change Password
				</h1>
				<p className="text-gray-500 text-center mt-2">
					Update your account password below
				</p>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{/* Old Password */}
					<div>
						<label className="block text-sm mb-2">
							Old Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword1 ? "text" : "password"}
								placeholder="Enter old password"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
							<FiEye
								onClick={() => setShowPassword1(!showPassword1)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
							/>
						</div>
						{errors.oldPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.oldPassword}
							</p>
						)}
					</div>

					{/* New Password */}
					<div>
						<label className="block text-sm mb-2">
							New Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword2 ? "text" : "password"}
								placeholder="Enter new password"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<FiEye
								onClick={() => setShowPassword2(!showPassword2)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
							/>
						</div>
						{errors.newPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.newPassword}
							</p>
						)}
					</div>

					{/* Confirm New Password */}
					<div>
						<label className="block text-sm mb-2">
							Confirm New Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword3 ? "text" : "password"}
								placeholder="Confirm new password"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
								value={confirmNewPassword}
								onChange={(e) =>
									setConfirmNewPassword(e.target.value)
								}
							/>
							<FiEye
								onClick={() => setShowPassword3(!showPassword3)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
							/>
						</div>
						{errors.confirmNewPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmNewPassword}
							</p>
						)}
					</div>

					{/* Server Error */}
					{errors.server && (
						<p className="text-red-500 text-sm text-center">
							{errors.server}
						</p>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 rounded-full hover:bg-indigo-700 cursor-pointer transition"
					>
						{loading ? <ButtonLoader text={"Changing password"}/> : "Change Password"}
					</button>
				</form>

				{/* Optional note */}
				<p className="text-center text-sm text-gray-500 mt-4">
					Remember your password?{" "}
					<a href="/login" className="text-pink-600 hover:underline">
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
}
