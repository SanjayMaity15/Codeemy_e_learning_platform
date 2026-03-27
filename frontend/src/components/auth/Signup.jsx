import axios from "axios";
import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";

export default function Signup() {
	const [role, setRole] = useState("Student");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	// Form States
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({}); // New state for errors

	const navigate = useNavigate();

	// Form Validation
	const validateForm = () => {
		const newErrors = {};

		if (firstName.trim().length < 3) {
			newErrors.firstName = "First name must be at least 3 characters";
		}

		if (lastName.trim().length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			newErrors.email = "Invalid email address";
		}

		if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // valid if no errors
	};

	// Submit Handler
	const handleSignup = async (e) => {
		e.preventDefault();
		if (!validateForm()) return; // Stop if validation fails

		setLoading(true);
		const signupData = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType: role,
		};

		try {
			// STEP 1: Send OTP
			const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/sendotp`, {
				email,
			});

			toast.success(result.data.message);
			setLoading(false);

			// STEP 2: Redirect to OTP page with signup data
			navigate("/verify-otp", {
				state: signupData,
			});
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error(error.response.data.message || "OTP sending failed");
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="w-full max-w-md px-6 shadow-md bg-white my-6 py-4 rounded-2xl border border-primary">
				{/* Icon */}
				<div className="flex justify-center mb-6">
					<div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
						<FiUser className="text-indigo-600 text-xl" />
					</div>
				</div>

				<h1 className="text-3xl font-bold text-primary text-center">
					Create Account
				</h1>
				<p className="text-gray-500 text-center mt-2">
					Join us and start learning today
				</p>

				{/* Role Selection */}
				<div className="flex justify-center gap-4 mt-6">
					<button
						type="button"
						onClick={() => setRole("Student")}
						className={`px-6 py-2 rounded-full text-sm border transition cursor-pointer ${
							role === "Student"
								? "bg-primary text-white border-white"
								: "border-neutral-700"
						}`}
					>
						Student
					</button>
					<button
						type="button"
						onClick={() => setRole("Instructor")}
						className={`px-6 py-2 rounded-full text-sm border transition cursor-pointer ${
							role === "Instructor"
								? "bg-primary text-white border-white"
								: "border-neutral-700"
						}`}
					>
						Instructor
					</button>
				</div>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSignup}>
					{/* First & Last Name */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm mb-2">
								First Name
							</label>
							<div className="relative">
								<FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
								<input
									type="text"
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									placeholder="First name"
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
								/>
							</div>
							{errors.firstName && (
								<p className="text-red-500 text-sm mt-1">
									{errors.firstName}
								</p>
							)}
						</div>

						<div>
							<label className="block text-sm mb-2">
								Last Name
							</label>
							<div className="relative">
								<FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
								<input
									type="text"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
									placeholder="Last name"
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
								/>
							</div>
							{errors.lastName && (
								<p className="text-red-500 text-sm mt-1">
									{errors.lastName}
								</p>
							)}
						</div>
					</div>

					{/* Email */}
					<div>
						<label className="block text-sm mb-2">
							Email Address
						</label>
						<div className="relative">
							<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
							/>
						</div>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm mb-2">
							Password
						</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Create a password"
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
								type={showConfirm ? "text" : "password"}
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								placeholder="Confirm your password"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
							/>
							<FiEye
								onClick={() => setShowConfirm(!showConfirm)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
							/>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword}
							</p>
						)}
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 rounded-full hover:bg-indigo-700 cursor-pointer transition"
					>
						{loading ? (
							<ButtonLoader text="Sending OTP"/>
						) : (
							<>
								<FiArrowRight />
								Sign Up as{" "}
								{role === "Student" ? "Student" : "Instructor"}
							</>
						)}
					</button>

					<p className="text-center text-sm text-gray-500">
						Already have an account?{" "}
						<a href="/login" className="text-pink-600 hover:underline">
							Sign In
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}
