import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/authSlice";
import { setUser } from "../../feature/profileSlice";

export default function VerifyOTP() {
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const signupData = location.state;

	// ✅ Protect route correctly
	useEffect(() => {
		if (!signupData) {
			navigate("/signup");
		}
	}, [signupData, navigate]);

	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}auth/signup`,
				{
					...signupData,
					otp,
				},
				{withCredentials: true}
			);

			if (result.status === 200) {
				dispatch(setToken(result?.data?.token));
				dispatch(setUser(result?.data?.user));
				console.log(result?.data?.user);

				localStorage.setItem("user", JSON.stringify(result.data.user));
				localStorage.setItem(
					"token",
					JSON.stringify(result.data.token),
				);
			}
			
			console.log(result.data);
			toast.success("Signup successful 🎉");
			navigate("/");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Invalid OTP");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-sm border bg-white shadow-md border-primary p-6 rounded-xl">
				<h2 className="text-primary text-2xl font-bold text-center">
					Verify OTP
				</h2>
				<p className="text-gray-500 text-center mt-2">
					OTP sent to {signupData?.email}
				</p>

				<form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
					<input
						type="text"
						maxLength="6"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						placeholder="Enter OTP"
						className="w-full text-center tracking-widest bg-transparent border-b border-neutral-600 py-3 focus:outline-none focus:border-primary"
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-white hover:bg-indigo-700 cursor-pointer 	 py-3 rounded-full"
					>
						{loading ? (
							<ButtonLoader text="Verifying" />
						) : (
							"Verify & Signup"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
