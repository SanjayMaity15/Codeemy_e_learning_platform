import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import { FaRobot, FaCertificate, FaStar, FaUserGraduate } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

import ChatBot from "../chatbot/Chatbot";

export default function HeroSection() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	const heroRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".hero-text", {
				y: 80,
				opacity: 0,
				duration: 1,
				stagger: 0.2,
				ease: "power3.out",
			});

			gsap.from(".floating-card", {
				y: 40,
				opacity: 0,
				duration: 1.5,
				stagger: 0.25,
				delay: 0.8,
				ease: "back.out(1.8)",
			});

			gsap.from(".stats", {
				y: 30,
				opacity: 0,
				delay: 1,
				stagger: 0.15,
				duration: 1,
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative overflow-hidden min-h-screen section-container flex items-center justify-center pb-6"
		>
			{/* Background Blobs */}

			<div className="absolute -top-20 left-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

			<div className="absolute top-40 right-10 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl"></div>

			<div className="absolute bottom-0 left-1/2 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl"></div>

			<div className="relative z-10 flex flex-col items-center text-center">
				{/* Badge */}

				<div className="hero-text inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-2 shadow-md mt-6">
					<span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

					<p className="text-sm font-semibold text-gray-600">
						AI Powered Learning Platform
					</p>
				</div>

				{/* Heading */}

				<h1 className="hero-text mt-8 text-5xl md:text-7xl font-bold leading-tight text-gray-800 font-orbitron">
					Build Skills
					<br />
					<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						That Build Your Future
					</span>
				</h1>

				{/* Paragraph */}

				<p className="hero-text mt-8 max-w-3xl text-lg leading-8 text-gray-600 font-inter">
					Master programming through structured courses, real-world
					projects, AI-powered mentoring, interactive quizzes,
					certificates and industry experts.
				</p>

				{/* Buttons */}

				<div className="hero-text mt-12 flex flex-wrap justify-center gap-5">
					<a
						href="#popular-courses"
						className="rounded-full bg-linear-to-r from-indigo-600 to-pink-500 px-8 py-4 text-white font-semibold shadow-xl transition hover:scale-105 cursor-pointer"
					>
						Explore Courses
					</a>

					<button
						onClick={() => navigate("/signup")}
						className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow transition hover:border-indigo-600 hover:text-indigo-600 cursor-pointer"
					>
						Become Instructor
					</button>
				</div>

				{/* Stats */}

				<div className="mt-16 flex flex-wrap justify-center gap-12">
					<div className="stats">
						<h2 className="text-4xl font-bold text-indigo-600">
							100+
						</h2>
						<p className="text-gray-500">Courses</p>
					</div>

					<div className="stats">
						<h2 className="text-4xl font-bold text-pink-600">
							10K+
						</h2>
						<p className="text-gray-500">Students</p>
					</div>

					<div className="stats">
						<h2 className="text-4xl font-bold text-green-600">
							25+
						</h2>
						<p className="text-gray-500">Mentors</p>
					</div>

					<div className="stats">
						<h2 className="text-4xl font-bold text-yellow-500">
							4.9★
						</h2>
						<p className="text-gray-500">Rating</p>
					</div>
				</div>

				{/* Floating Cards */}

				<div className="hidden lg:block">
					<div className="floating-card absolute -left-10 top-26 rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-2xl">
						<div className="flex items-center gap-3">
							<FaRobot className="text-3xl text-indigo-600" />

							<div>
								<h3 className="font-semibold text-gray-800">
									AI Mentor
								</h3>

								<p className="text-sm text-gray-500">
									24/7 Learning Support
								</p>
							</div>
						</div>
					</div>

					<div className="floating-card absolute right-0 top-88 rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-2xl">
						<div className="flex items-center gap-3">
							<FaCertificate className="text-3xl text-green-500" />

							<div>
								<h3 className="font-semibold text-gray-800">
									Certificate
								</h3>

								<p className="text-sm text-gray-500">
									Industry Recognized
								</p>
							</div>
						</div>
					</div>

					<div className="floating-card absolute left-5 bottom-24 rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-2xl">
						<div className="flex items-center gap-3">
							<MdMenuBook className="text-3xl text-pink-500" />

							<div>
								<h3 className="font-semibold text-gray-800">
									Projects
								</h3>

								<p className="text-sm text-gray-500">
									Hands-on Learning
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>

			{/* ChatBot */}

			<div className="fixed bottom-8 right-8 z-50">
				<ChatBot />
			</div>
		</section>
	);
}
