import axios from "axios";
import React, { useState } from "react";
import { FiLock, FiMail, FiEye, FiArrowRight, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../feature/authSlice";
import { setUser } from "../../feature/profileSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({}); // Added errors state

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Form validation
	const validateForm = () => {
		const newErrors = {};

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			newErrors.email = "Invalid email address";
		}

		if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validateForm()) return; // stop if invalid

		setLoading(true);
		try {
			const result = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}auth/login`,
				{ email, password },
				{ withCredentials: true },
			);

			if (result.status === 200) {
				dispatch(setToken(result.data.token));
				dispatch(setUser(result.data.user));
				console.log(result.data.user);

				localStorage.setItem("user", JSON.stringify(result.data.user));
				localStorage.setItem(
					"token",
					JSON.stringify(result.data.token),
				);
			}

			toast.success("Login successfully");
			setLoading(false);
			navigate("/");
		} catch (error) {
			setLoading(false);
			console.log("Login error", error);
			toast.error(error.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="w-full max-w-md px-6 border shadow-md bg-white border-primary my-6 py-4 rounded-2xl">
				{/* Lock Icon */}
				<div className="flex justify-center mb-6">
					<div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
						<FiLock className="text-primary text-xl" />
					</div>
				</div>

				{/* Heading */}
				<h1 className="text-3xl font-bold text-primary text-center">
					Welcome Back
				</h1>
				<p className="text-gray-500 text-center mt-2">
					Sign in to continue your journey
				</p>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleLogin}>
					{/* Email */}
					<div>
						<label className="block text-sm mb-2">Email</label>
						<div className="relative">
							<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type="text"
								placeholder="Enter your email"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
						<label className="block text-sm mb-2">Password</label>
						<div className="relative">
							<FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-10 placeholder-neutral-500 focus:outline-none focus:border-primary"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{showPassword ? (
								<FiEye
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
								/>
							) : (
								<FiEyeOff
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
								/>
							)}
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password}
							</p>
						)}
					</div>

					{/* Forgot password */}
					<div className="text-right">
						<Link
							to="/forgot-password"
							className="text-sm text-pink-600 hover:underline"
						>
							Forgot Password?
						</Link>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 cursor-pointer rounded-full hover:bg-indigo-700 transition"
					>
						{loading ? (
							<ButtonLoader text="Logging in" />
						) : (
							<>
								<FiArrowRight />
								Sign In
							</>
						)}
					</button>

					<p className="text-center text-sm text-gray-500">
						Don't have an account?{" "}
						<a
							href="/signup"
							className="text-pink-600 hover:underline"
						>
							Sign up
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}
