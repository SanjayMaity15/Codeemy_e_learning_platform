import {
	FaRocket,
	FaBrain,
	FaProjectDiagram,
	FaChartLine,
} from "react-icons/fa";
import { useRef } from "react";
import { useScrollAnim } from "../common/ScrollAnimation";

const features = [
	{
		icon: <FaRocket />,
		title: "Career-Oriented Learning",
		desc: "Master industry-demanded technologies with structured learning paths designed to help you land your dream job.",
		color: "from-pink-500 to-rose-500",
	},
	{
		icon: <FaBrain />,
		title: "AI Learning Assistant",
		desc: "Get instant explanations, coding guidance, and platform support anytime with our built-in AI assistant.",
		color: "from-indigo-500 to-blue-500",
	},
	{
		icon: <FaProjectDiagram />,
		title: "Project-Based Learning",
		desc: "Build real-world applications that strengthen your portfolio and prepare you for professional development.",
		color: "from-cyan-500 to-indigo-500",
	},
	{
		icon: <FaChartLine />,
		title: "Track Your Progress",
		desc: "Monitor completed lessons, quizzes, certificates, and achievements from your personalized dashboard.",
		color: "from-pink-500 to-orange-500",
	},
];

export default function WhyChooseUs() {
	const sectionRef = useRef(null);

	useScrollAnim(sectionRef, {
		start: "top 75%",
		end: "top 40%",
	});

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden py-24 section-container"
		>
			{/* Background Blur */}
			<div className="absolute -top-28 left-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

			<div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

			{/* Heading */}

			<div className="text-center max-w-3xl mx-auto mb-16">
				<h2 className="font-orbitron text-4xl md:text-5xl font-bold text-gray-800">
					Why Choose{" "}
					<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
						Codeemy
					</span>
				</h2>

				<p className="mt-5 text-lg leading-8 text-gray-600">
					Everything you need to become a skilled developer —
					structured courses, AI assistance, hands-on projects,
					quizzes, certificates, and career-focused learning.
				</p>
			</div>

			{/* Cards */}

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{features.map((item, index) => (
					<div
						key={index}
						className="
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        border
                        border-gray-200
                        shadow-sm
                        hover:shadow-2xl
                        transition-all
                        duration-500
                        hover:-translate-y-3
                        p-8
                    "
					>
						{/* Gradient Top */}

						<div
							className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${item.color}`}
						/>

						{/* Glow */}

						<div
							className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-linear-to-r ${item.color} opacity-10 blur-3xl group-hover:opacity-30 transition`}
						/>

						{/* Icon */}

						<div
							className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${item.color} text-white text-3xl shadow-lg`}
						>
							{item.icon}
						</div>

						{/* Title */}

						<h3 className="mt-6 text-xl font-bold text-gray-800">
							{item.title}
						</h3>

						{/* Description */}

						<p className="mt-4 text-gray-600 leading-7 text-sm">
							{item.desc}
						</p>

						{/* Bottom Line */}

						<div
							className={`mt-7 h-1 w-12 rounded-full bg-linear-to-r ${item.color} transition-all duration-500 group-hover:w-full`}
						/>
					</div>
				))}
			</div>

			{/* Bottom Banner */}

			<div className="mt-20 rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-10 text-center shadow-xl">
				<h3 className="font-orbitron text-3xl font-bold text-white">
					Learn. Build. Get Hired.
				</h3>

				<p className="mt-4 text-white/90 max-w-3xl mx-auto leading-8">
					Codeemy combines practical learning, AI-powered guidance,
					real projects, quizzes, and certificates to help students
					become industry-ready developers.
				</p>
			</div>
		</section>
	);
}
