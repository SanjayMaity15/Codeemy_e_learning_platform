import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {

	const navigate = useNavigate()

	const { user } = useSelector((state) => state.profile);
	
	return (
		<div className="min-h-screen section-container w-full text-white relative overflow-hidden pb-12">
			{/* Subtle background glow */}
			<div className="absolute bg-pink-300 w-36 h-36 md:left-64 top-24 rounded-full blur-3xl animate-pulse duration-1000" />

			{/* Hero Content */}
			<main className="relative z-10 flex flex-col font-orbitron items-center justify-center text-center md:px-6 md:mt-30 mt-12">
				<h2 className="text-3xl md:text-6xl font-medium text-neutral-500">
					Build Skills That Shape Your
				</h2>
				<h1 className="mt-4 text-5xl md:text-7xl font-bold bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
					Future With <span className="">Codeemy</span>
				</h1>

				<p className="mt-8 max-w-2xl font-inter text-neutral-500 md:text-lg">
					Powered by modern learning methods, Codeemy helps you master
					coding through structured courses, hands-on practice, and
					real-world projects.
				</p>

				{/* Button */}
				<button
					className="mt-12 px-10 py-3 rounded-full shadow-sm  border border-indigo-800 bg-primary hover:border-indigo-400 transition font-semibold hover:opacity-90  cursor-pointer"
					onClick={() => navigate(user ? "/" : "/login")}
				>
					Join Us
				</button>
			</main>
		</div>
	);
}
