import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useScrollAnim } from "../common/ScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function CodeBlocks() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	const codeBlockRef = useRef(null);

	useScrollAnim(codeBlockRef, {
		start: "top 75%",
		end: "top 40%",
	});

	return (
		<section
			ref={codeBlockRef}
			className="section-container py-24 overflow-hidden"
		>
			<div className="grid lg:grid-cols-2 gap-14 items-center">
				{/* Left Side */}

				<div>
					<div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 mb-6">
						🚀 Learn by Building Real Projects
					</div>

					<h1 className="text-5xl lg:text-6xl font-bold leading-tight font-orbitron text-gray-800">
						Master Coding
						<br />
						with
						<span className="bg-linear-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
							{" "}
							Codeemy
						</span>
					</h1>

					<p className="mt-7 text-lg text-gray-500 leading-8 max-w-xl">
						Learn Web Development, AI, Programming, DSA and
						Placement Preparation from experienced instructors.
						Practice through projects, quizzes and earn verified
						certificates.
					</p>

					<div className="mt-10 flex gap-5 flex-wrap">
						<button
							onClick={() =>
								navigate(user ? "/courses" : "/login")
							}
							className="rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-4 text-white font-semibold shadow-xl transition hover:-translate-y-1 hover:shadow-indigo-300"
						>
							Start Learning →
						</button>

						<button
							onClick={() => navigate("/courses")}
							className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold hover:border-indigo-500 hover:text-indigo-600 transition"
						>
							Explore Courses
						</button>
					</div>

					<div className="mt-10 flex gap-10">
						<div>
							<h2 className="text-3xl font-bold text-indigo-600">
								50+
							</h2>
							<p className="text-gray-500">Courses</p>
						</div>

						<div>
							<h2 className="text-3xl font-bold text-pink-500">
								1000+
							</h2>
							<p className="text-gray-500">Students</p>
						</div>

						<div>
							<h2 className="text-3xl font-bold text-violet-600">
								20+
							</h2>
							<p className="text-gray-500">Projects</p>
						</div>
					</div>
				</div>

				{/* Right Side */}

				<div className="relative">
					{/* Blur */}

					<div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-indigo-300 blur-[120px] opacity-30"></div>

					<div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-pink-300 blur-[120px] opacity-30"></div>

					{/* Glow Border */}

					<div className="rounded-3xl bg-linear-to-r from-indigo-500 via-violet-500 to-pink-500 p-0.5 shadow-2xl">
						<div className="rounded-3xl bg-[#0f172a] overflow-hidden">
							{/* Window Header */}

							<div className="flex items-center gap-2 px-5 py-4 border-b border-slate-700">
								<div className="w-3 h-3 rounded-full bg-red-500"></div>

								<div className="w-3 h-3 rounded-full bg-yellow-500"></div>

								<div className="w-3 h-3 rounded-full bg-green-500"></div>

								<p className="ml-4 text-gray-400 text-sm">
									index.html
								</p>
							</div>

							{/* Code */}

							<div className="flex">
								{/* Line Numbers */}

								<div className="bg-[#111827] px-4 py-4 text-gray-500 text-sm leading-7 select-none">
									{Array.from({ length: 18 }).map((_, i) => (
										<p key={i}>{i + 1}</p>
									))}
								</div>

								{/* Animated Code */}

								<div className="flex-1 px-2 py-4 font-mono text-sm leading-7 text-green-400 overflow-x-auto">
									<TypeAnimation
										sequence={[
											`<!DOCTYPE html>
												<html>
												<head>
												<title>Codeemy</title>
												</head>
												<body>
													<h1>Welcome to Codeemy 🚀</h1>

													<p>Build Real Projects</p>

												<script>
													console.log("Happy Coding!");
												</script>

												</body>
												</html>`,
											2500,
											"",
										]}
										repeat={Infinity}
										cursor={true}
										style={{
											whiteSpace: "pre-line",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
