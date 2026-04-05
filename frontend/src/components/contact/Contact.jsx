import React, { useEffect, useRef, useState } from "react";
import {
	FiMail,
	FiUser,
	FiMessageCircle,
	FiPhone,
	FiSend,
} from "react-icons/fi";

import axios from "axios";
import contactImg from "../../assets/contact.jpeg"
import PageTitle from "../common/HelmetForTitle";
import { gsap } from "gsap";
import toast from "react-hot-toast";

export default function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const formRef = useRef(null)
	const imageRef = useRef(null)

	useEffect(() => {
		gsap.from(formRef.current, {
			x: -100,
			opacity: 0,
			duration:1
		})
		gsap.from(imageRef.current, {
			x: 100,
			opacity: 0,
			duration:1
		})
	}, [])

	const validateForm = () => {
		const newErrors = {};
		if (!name) newErrors.name = "Name is required";

		if (!email) {
			newErrors.email = "Email is required";
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email))
				newErrors.email = "Invalid email address";
		}

		if (!phone) {
			newErrors.phone = "Phone number is required";
		} else {
			const phoneRegex = /^[0-9]{10,15}$/;
			if (!phoneRegex.test(phone))
				newErrors.phone = "Invalid phone number";
		}

		if (!message) newErrors.message = "Message is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleContactUs = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setLoading(true);
			await axios.post(`${import.meta.env.VITE_SERVER_URL}contact/contact-us`, {
				name,
				email,
				phone,
				message,
			}, {withCredentials: true});
			toast.success("Message sent successfully!");
			setName("");
			setEmail("");
			setPhone("");
			setMessage("");
			setErrors({});
		} catch (error) {
			toast.error(
				error.response?.data?.message || "Failed to send message"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full px-4 pb-12">
			<PageTitle title={"Contact us"}/>
			<div className="flex justify-center pt-6">
				<div className="h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center mb-2">
					<FiMessageCircle className="text-pink-600 text-xl" />
				</div>
			</div>

			<h1 className="text-3xl md:text-5xl font-orbitron font-bold text-pink-600 text-center ">
				Let's get in touch
			</h1>
			<p className="text-gray-500 text-center mt-2 text-lg">
				Send us a message and we’ll respond soon
			</p>

			<div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mx-auto">
				{/* FORM SECTION */}
				<div className="px-6 border border-neutral-700 rounded-2xl py-6" ref={formRef}>
					<form className="mt-8 space-y-6" onSubmit={handleContactUs}>
						{/* Name */}
						<div>
							<label className="block text-sm mb-2">
								Name
							</label>
							<div className="relative">
								<FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
								<input
									type="text"
									placeholder="Enter your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-pink-600"
								/>
							</div>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name}
								</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm mb-2">
								Email
							</label>
							<div className="relative">
								<FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
								<input
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-pink-600"
								/>
							</div>
						</div>

						{/* Phone */}
						<div>
							<label className="block text-sm mb-2">
								Phone
							</label>
							<div className="relative">
								<FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
								<input
									type="text"
									placeholder="Enter phone number"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-pink-600"
								/>
							</div>
						</div>

						{/* Message */}
						<div>
							<label className="block text-sm mb-2">
								Message
							</label>
							<div className="relative">
								<FiMessageCircle className="absolute left-3 top-3 text-neutral-500" />
								<textarea
									placeholder="Write your message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="w-full bg-transparent border-b border-neutral-700 py-3 pl-10 pr-3 placeholder-neutral-500 focus:outline-none focus:border-pink-600 resize-none h-24"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-4 rounded-full hover:bg-indigo-700 cursor-pointer transition"
						>
							{loading ? (
								"Sending..."
							) : (
								<>
									<FiSend /> Send Message
								</>
							)}
						</button>
					</form>
				</div>

				{/* IMAGE SECTION (hidden on small screens) */}
				<div className="hidden md:flex justify-center h-full rounded-2xl" ref={imageRef}>
					<img
						src={contactImg} // <-- replace with your image path
						alt="Contact Us"
						className="max-w-full h-full rounded-2xl"
					/>
				</div>
			</div>
		</div>
	);
}
