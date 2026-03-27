import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiLock, FiEye, FiArrowRight } from "react-icons/fi";
import ButtonLoader from "../common/ButtonLoader";

export default function ResetPassword() {
	const { token } = useParams();
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const validateForm = () => {
		const newErrors = {};

		if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setLoading(true);

			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}auth/reset-password`,
				{
					password,
					confirmPassword,
					token,
				}
			);

			toast.success(response.data.message);
			navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Reset failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="w-full max-w-md px-6 border border-primary bg-white shadow-md my-6 py-4 rounded-2xl">
				{/* Icon */}
				<div className="flex justify-center mb-6">
					<div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
						<FiLock className="text-primary text-xl" />
					</div>
				</div>

				{/* Heading */}
				<h1 className="text-3xl font-bold text-primary text-center">
					Reset Password
				</h1>
				<p className="text-gray-500 text-center mt-2">
					Enter your new password below
				</p>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{/* New Password */}
					<div>
						<label className="block text-sm mb-2">
							New Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter new password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
							/>
							<FiEye
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
							/>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password}
							</p>
						)}
					</div>

					{/* Confirm Password */}
					<div>
						<label className="block text-sm mb-2">
							Confirm Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Confirm new password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
							/>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword}
							</p>
						)}
					</div>

					{/* Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 rounded-full hover:bg-indigo-700 transition"
					>
						{loading ? (
							<ButtonLoader text={"Resetting password"}/>
						) : (
							<>
								<FiArrowRight />
								Reset Password
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
