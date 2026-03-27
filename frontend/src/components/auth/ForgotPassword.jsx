import axios from "axios";
import React, { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			toast.error("Email is required");
			return;
		}

		try {
			setLoading(true);
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}auth/reset-password-token`,
				{ email },
				{ withCredentials: true }
			);

			setMessage(response.data.message);
			toast.success("Reset email sent");
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="w-full max-w-md px-6 border bg-white shadow-md border-primary my-6 py-4 rounded-2xl">
				{/* Icon */}
				<div className="flex justify-center mb-6">
					<div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
						<FiLock className="text-primary text-xl" />
					</div>
				</div>

				{/* Heading */}
				<h1 className="text-3xl font-bold text-primary text-center">
					Forgot Password
				</h1>
				<p className="text-gray-500 text-center mt-2">
					Enter your registered email to reset your password
				</p>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{/* Email */}
					<div>
						<label className="block text-sm mb-2">
							Email
						</label>
						<div className="relative">
							<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
							<input
								type="email"
								placeholder="Enter your registered email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-primary"
							/>
						</div>
					</div>

					{/* Success message */}
					{message && (
						<p className="text-green-500 text-sm text-center">
							{message}
						</p>
					)}

					{/* Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 rounded-full hover:bg-indigo-700 cursor-pointer transition"
					>
						{loading ? (
							<ButtonLoader text={"Sending OTP"}/>
						) : (
							<>
								<FiArrowRight />
								Send Reset Link
							</>
						)}
					</button>

					<p className="text-center text-sm text-gray-500">
						Remembered your password?{" "}
						<a href="/login" className="text-pink-600 hover:underline">
							Back to Login
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}
