import React from "react";
import {
	FiBookOpen,
	FiTrendingUp,
	FiTarget,
	FiGlobe,
	FiCode,
	FiLayers,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../common/HelmetForTitle";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutUs() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	const textRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const lines = gsap.utils.toArray(".wave-line");

			lines.forEach((line, index) => {
				const letters = line.querySelectorAll("span");

				gsap.from(letters, {
					y: 60,
					opacity: 0,
					rotateX: -90,
					transformOrigin: "top",
					duration: 0.6,
					ease: "power3.out",
					stagger: 0.04,
					delay: index * 0.3, // 🔥 second line comes later
				});
			});
		}, textRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="relative overflow-hidden">
			<PageTitle title="About Codeemy" />

			{/* Background Blobs */}
			<div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>

			<div className="absolute top-96 -right-40 w-120 h-120 bg-pink-500/10 blur-[140px] rounded-full"></div>

			<div className="section-container relative z-10">
				{/* HERO */}

				<section className="min-h-screen flex items-center">
					<div className="grid md:grid-cols-2 gap-16 items-center">
						{/* LEFT */}

						<div>
							<p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-primary font-semibold mb-8">
								✨ Learn • Build • Grow
							</p>

							<h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight">
								<span className="text-gray-700">
									Empowering
								</span>

								<br />

								<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
									Future Developers
								</span>
							</h1>

							<p className="mt-8 text-lg text-gray-500 leading-8">
								Codeemy helps students master modern software
								development through structured learning,
								industry-focused projects, AI assistance, and
								expert mentorship.
							</p>

							<div className="flex gap-5 mt-10 flex-wrap">
								<Link to={user ? "/courses" : "/login"}>
									<button className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:scale-105 transition">
										Start Learning
									</button>
								</Link>

								<Link to="/courses">
									<button className="px-8 py-4 rounded-full border border-indigo-500 text-primary font-semibold hover:bg-indigo-50 transition">
										Explore Courses
									</button>
								</Link>
							</div>
						</div>

						{/* RIGHT */}

						<div className="relative">
							<div className="rounded-[35px] bg-white border border-gray-200 shadow-2xl p-8">
								<img
									src="https://plus.unsplash.com/premium_photo-1663075847012-c781e0d194ce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Students"
									className="rounded-3xl"
								/>
							</div>

							{/* Floating Card */}

							<div className="absolute -left-10 top-12 bg-white rounded-2xl shadow-xl px-6 py-4">
								<p className="text-sm text-gray-500">
									Students
								</p>

								<h2 className="text-3xl font-bold text-primary">
									10K+
								</h2>
							</div>

							<div className="absolute -right-8 bottom-12 bg-white rounded-2xl shadow-xl px-6 py-4">
								<p className="text-sm text-gray-500">Courses</p>

								<h2 className="text-3xl font-bold text-pink-600">
									200+
								</h2>
							</div>
						</div>
					</div>
				</section>

				{/* ================= OUR STORY ================= */}

				<section className="py-24">
					<div className="text-center mb-16">
						<p className="text-primary font-semibold tracking-widest uppercase">
							Our Story
						</p>

						<h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-3">
							From an Idea to a
							<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
								{" "}
								Learning Platform
							</span>
						</h2>

						<p className="text-gray-500 mt-5 max-w-3xl mx-auto leading-8">
							Every great platform starts with one simple
							question: "Why is learning programming still so
							difficult?"
						</p>
					</div>

					<div className="relative max-w-5xl mx-auto">
						{/* Vertical Line */}

						<div className="absolute left-5 top-0 bottom-0 w-1 bg-linear-to-b from-indigo-500 via-pink-500 to-purple-500 rounded-full"></div>

						<div className="space-y-14">
							{/* Step */}

							<div className="relative pl-20">
								<div className="absolute left-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg">
									1
								</div>

								<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
									<h3 className="text-2xl font-bold text-primary mb-3">
										The Problem
									</h3>

									<p className="text-gray-500 leading-8">
										Thousands of students complete college
										every year but still struggle with
										coding interviews, practical
										development, and industry expectations.
									</p>
								</div>
							</div>

							{/* Step */}

							<div className="relative pl-20">
								<div className="absolute left-0 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
									2
								</div>

								<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
									<h3 className="text-2xl font-bold text-pink-600 mb-3">
										Our Solution
									</h3>

									<p className="text-gray-500 leading-8">
										We created Codeemy to provide structured
										learning, project-based education,
										AI-powered assistance, and guidance from
										experienced mentors.
									</p>
								</div>
							</div>

							{/* Step */}

							<div className="relative pl-20">
								<div className="absolute left-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-lg">
									3
								</div>

								<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
									<h3 className="text-2xl font-bold text-green-600 mb-3">
										Our Mission Today
									</h3>

									<p className="text-gray-500 leading-8">
										Our goal is simple: make high-quality
										tech education affordable, practical,
										and accessible to every learner,
										regardless of their background.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ================= Mission Vision Values ================= */}

				<section className="py-24">
					<div className="text-center mb-16">
						<p className="uppercase tracking-widest text-primary font-semibold">
							Our Foundation
						</p>

						<h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-4">
							Mission, Vision &
							<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
								{" "}
								Values
							</span>
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Mission */}

						<div className="group bg-white rounded-3xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-8">
								<FiTarget className="text-3xl text-primary" />
							</div>

							<h3 className="text-2xl font-bold mb-5">
								Our Mission
							</h3>

							<p className="text-gray-500 leading-8">
								Deliver industry-ready education through
								practical learning, real-world projects, AI
								guidance, and mentorship that prepares learners
								for successful technology careers.
							</p>
						</div>

						{/* Vision */}

						<div className="group bg-white rounded-3xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-8">
								<FiTrendingUp className="text-3xl text-pink-600" />
							</div>

							<h3 className="text-2xl font-bold mb-5">
								Our Vision
							</h3>

							<p className="text-gray-500 leading-8">
								To become one of the most trusted online
								learning platforms that transforms beginners
								into confident software developers through
								quality education.
							</p>
						</div>

						{/* Values */}

						<div className="group bg-white rounded-3xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-8">
								<FiGlobe className="text-3xl text-green-600" />
							</div>

							<h3 className="text-2xl font-bold mb-5">
								Our Values
							</h3>

							<p className="text-gray-500 leading-8">
								Consistency, innovation, curiosity,
								collaboration, and lifelong learning are the
								principles that shape every course and every
								learner at Codeemy.
							</p>
						</div>
					</div>
				</section>

				{/* ================= WHAT WE TEACH ================= */}

				<section className="py-24">
					<div className="text-center mb-16">
						<p className="uppercase tracking-widest text-primary font-semibold">
							What You'll Learn
						</p>

						<h2 className="text-4xl md:text-5xl font-bold font-orbitron mt-3">
							Skills That Build
							<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
								{" "}
								Successful Careers
							</span>
						</h2>

						<p className="text-gray-500 max-w-3xl mx-auto mt-5 leading-8">
							Our curriculum focuses on the technologies and
							skills companies actually expect from modern
							developers.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Card */}

						<div className="group rounded-3xl bg-linear-to-br from-indigo-500 to-blue-600 text-white p-10 shadow-xl hover:-translate-y-4 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
								<FiCode className="text-3xl" />
							</div>

							<h3 className="text-2xl font-bold mb-4">
								Web Development
							</h3>

							<p className="leading-8 opacity-90">
								Master HTML, CSS, JavaScript, React, Node.js,
								Express, MongoDB and modern full-stack
								development through real projects.
							</p>
						</div>

						{/* Card */}

						<div className="group rounded-3xl bg-linear-to-br from-pink-500 to-rose-500 text-white p-10 shadow-xl hover:-translate-y-4 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
								<FiLayers className="text-3xl" />
							</div>

							<h3 className="text-2xl font-bold mb-4">
								DSA & Algorithms
							</h3>

							<p className="leading-8 opacity-90">
								Build strong problem-solving skills through
								arrays, trees, graphs, dynamic programming and
								coding interview preparation.
							</p>
						</div>

						{/* Card */}

						<div className="group rounded-3xl bg-linear-to-br from-emerald-500 to-green-600 text-white p-10 shadow-xl hover:-translate-y-4 transition duration-500">
							<div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
								<FiBookOpen className="text-3xl" />
							</div>

							<h3 className="text-2xl font-bold mb-4">
								Career Preparation
							</h3>

							<p className="leading-8 opacity-90">
								Prepare for internships and placements with
								resume building, mock interviews, aptitude
								guidance and industry-ready projects.
							</p>
						</div>
					</div>
				</section>
				{/* ================= HOW WE TEACH ================= */}

				<section className="py-24">
					<div className="grid lg:grid-cols-2 gap-20 items-center">
						{/* Left */}

						<div>
							<p className="uppercase tracking-widest text-primary font-semibold">
								Our Learning Process
							</p>

							<h2 className="text-4xl md:text-5xl font-bold font-orbitron mt-3 leading-tight">
								Learn Faster,
								<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
									{" "}
									Practice Smarter
								</span>
							</h2>

							<p className="mt-8 text-gray-500 leading-8">
								Every course at Codeemy is carefully structured
								to help you understand concepts quickly,
								practice consistently, and build confidence
								through real projects instead of memorization.
							</p>

							<p className="mt-5 text-gray-500 leading-8">
								We believe long-term growth comes from hands-on
								learning, feedback, and continuous
								improvement—not shortcuts.
							</p>
						</div>

						{/* Right */}

						<div className="space-y-6">
							<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition">
								<h3 className="text-xl font-bold text-indigo-600 mb-3">
									01. Learn
								</h3>

								<p className="text-gray-500 leading-7">
									Understand concepts with easy explanations
									and visual examples.
								</p>
							</div>

							<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition">
								<h3 className="text-xl font-bold text-pink-600 mb-3">
									02. Practice
								</h3>

								<p className="text-gray-500 leading-7">
									Solve coding challenges, quizzes and
									real-world assignments after every lesson.
								</p>
							</div>

							<div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition">
								<h3 className="text-xl font-bold text-emerald-600 mb-3">
									03. Build
								</h3>

								<p className="text-gray-500 leading-7">
									Create portfolio-worthy projects and prepare
									for real technical interviews.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ================= COMMUNITY ================= */}

				<section className="py-24">
					<div className="rounded-[40px] bg-linear-to-r from-indigo-600 via-violet-600 to-pink-600 text-white overflow-hidden relative">
						{/* Background Glow */}

						<div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

						<div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-400/20 blur-3xl" />

						<div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center p-10 md:p-20">
							{/* Left */}

							<div>
								<p className="uppercase tracking-widest text-pink-100 font-semibold">
									Community & Mentorship
								</p>

								<h2 className="text-4xl md:text-5xl font-bold font-orbitron mt-4 leading-tight">
									Learn Together.
									<br />
									Grow Together.
								</h2>

								<p className="mt-8 text-indigo-100 leading-8">
									Codeemy isn't just a place to watch videos.
									You'll learn with mentors, connect with
									other students, ask questions, solve
									problems together, and stay motivated
									throughout your journey.
								</p>
							</div>

							{/* Right */}

							<div className="grid grid-cols-2 gap-6">
								<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
									<h3 className="text-5xl font-bold">500+</h3>

									<p className="mt-3 text-indigo-100">
										Students Learning
									</p>
								</div>

								<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
									<h3 className="text-5xl font-bold">20+</h3>

									<p className="mt-3 text-indigo-100">
										Industry Courses
									</p>
								</div>

								<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
									<h3 className="text-5xl font-bold">100+</h3>

									<p className="mt-3 text-indigo-100">
										Projects Built
									</p>
								</div>

								<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
									<h3 className="text-5xl font-bold">24×7</h3>

									<p className="mt-3 text-indigo-100">
										AI Learning Assistant
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* ================= WHY CODEEMY ================= */}

				<section className="py-24">
					<div className="text-center mb-16">
						<p className="text-primary font-semibold tracking-widest uppercase">
							Why Choose Us
						</p>

						<h2 className="text-4xl md:text-5xl font-bold font-orbitron mt-4">
							Why Learn With
							<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
								{" "}
								Codeemy
							</span>
						</h2>

						<p className="text-gray-500 mt-6 max-w-2xl mx-auto">
							Everything you need to become industry ready—from
							structured learning to AI-powered assistance and
							real projects.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-indigo-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
								🚀
							</div>

							<h3 className="mt-6 text-xl font-bold">
								Career Focused
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Learn exactly what companies expect in technical
								interviews.
							</p>
						</div>

						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-pink-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl">
								🤖
							</div>

							<h3 className="mt-6 text-xl font-bold">
								AI Learning Assistant
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Get instant explanations and guidance whenever
								you're stuck.
							</p>
						</div>

						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
								💻
							</div>

							<h3 className="mt-6 text-xl font-bold">
								Hands-on Projects
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Build portfolio-ready projects while learning
								modern tools.
							</p>
						</div>

						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-orange-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
								📚
							</div>

							<h3 className="mt-6 text-xl font-bold">
								Structured Learning
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Clear roadmap from beginner to advanced with no
								confusion.
							</p>
						</div>

						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-green-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
								🎯
							</div>

							<h3 className="mt-6 text-xl font-bold">
								Interview Preparation
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Prepare for service-based and product-based
								company interviews.
							</p>
						</div>

						<div className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-cyan-500 hover:-translate-y-3 transition duration-300 shadow-sm hover:shadow-xl">
							<div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-2xl">
								🏆
							</div>

							<h3 className="mt-6 text-xl font-bold">
								Certification
							</h3>

							<p className="text-gray-500 mt-4 leading-7">
								Earn certificates after completing courses and
								quizzes.
							</p>
						</div>
					</div>
				</section>
				{/* ================= FINAL CTA ================= */}
				<section className="py-24">
					<div className="max-w-6xl mx-auto px-6">
						<div className="relative overflow-hidden rounded-4xl bg-linear-to-r from-indigo-600 via-violet-600 to-pink-600 p-12 md:p-16 text-center">
							{/* Glow */}
							<div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>
							<div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

							<div className="relative z-10">
								<h2 className="text-4xl md:text-5xl font-bold text-white font-orbitron">
									Ready To Build Your Future?
								</h2>

								<p className="text-indigo-100 max-w-2xl mx-auto mt-6 text-lg leading-8">
									Join thousands of learners building
									real-world skills through practical
									projects, expert mentorship, and structured
									learning.
								</p>

								<div className="flex flex-wrap justify-center gap-5 mt-10">
									<Link to={user ? "/courses" : "/login"}>
										<button className="bg-white text-indigo-700 px-10 py-4 rounded-full font-bold hover:scale-105 transition cursor-pointer shadow-lg">
											Explore Courses
										</button>
									</Link>

									<Link to="/contact">
										<button className="border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-indigo-700 transition cursor-pointer">
											Contact Us
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
				
				
}
