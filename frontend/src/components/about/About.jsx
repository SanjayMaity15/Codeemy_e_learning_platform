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

export default function AboutUs() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	return (
		<div className="w-full section-container text-black">
			{/* ================= HERO SECTION ================= */}
			<section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
				<h1 className="text-4xl md:text-6xl text-pink-600 font-bold mb-6 leading-tight font-orbitron">
					Empowering Learners.
					<br />
					<span className="text-neutral-500">
						Building Future Careers.
					</span>
				</h1>
				<p className="max-w-4xl text-gray-500 text-lg md:text-xl leading-relaxed">
					Codeemy is an education-first technology platform focused on
					transforming how students and professionals learn modern
					technical skills. We don’t just teach concepts — we help
					learners build confidence, discipline, and real-world
					problem-solving ability.
				</p>
			</section>

			{/* ================= OUR ORIGIN ================= */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 font-orbitron text-pink-600">
					Our Origin
				</h2>
				<div className="space-y-6 text-gray-500 leading-relaxed">
					<p>
						Codeemy was born from a simple observation: many
						students spend years learning theory but still feel
						unprepared for real-world software development and
						technical interviews. The gap between academic learning
						and industry expectations continues to grow.
					</p>
					<p>
						We created Codeemy to bridge this gap. Our platform
						focuses on structured learning paths, hands-on practice,
						and mentor-guided growth so learners can move from
						confusion to clarity and from basics to mastery.
					</p>
					<p>
						Whether you are a beginner taking your first step into
						coding or a final-year student preparing for placements,
						Codeemy is designed to support you at every stage of
						your journey.
					</p>
				</div>
			</section>

			{/* ================= MISSION, VISION, VALUES ================= */}
			<section className=" border-gray-800 p-8 hover:border-green-400 transition py-16">
				<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
					<div className="bg-white p-8">
						<h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-orbitron text-orange-500">
							<FiTarget className="text-green-500" /> Our Mission
						</h3>
						<p className="text-gray-500 leading-relaxed">
							To deliver practical, industry-aligned education
							that empowers learners to think critically, build
							confidently, and succeed in competitive tech
							careers.
						</p>
					</div>
					<div className="bg-white p-8">
						<h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-orbitron text-primary">
							<FiTrendingUp className="text-green-500" /> Our
							Vision
						</h3>
						<p className="text-gray-500 leading-relaxed">
							To become a trusted global learning ecosystem where
							skill, discipline, and innovation define success —
							not background or privilege.
						</p>
					</div>
					<div className="bg-white p-8">
						<h3 className="text-2xl font-bold mb-4 flex items-center gap-3 font-orbitron ">
							<FiGlobe className="text-green-500" /> Our Values
						</h3>
						<p className="text-gray-500 leading-relaxed">
							We believe in consistency over shortcuts, depth over
							surface learning, and community-driven growth over
							isolated progress.
						</p>
					</div>
				</div>
			</section>

			{/* ================= WHAT WE TEACH ================= */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron text-pink-600">
					What We Teach
				</h2>
				<div className="grid md:grid-cols-3 gap-10">
					<div className=" border-gray-800 bg-white p-8 hover:border-green-400 transition rounded-2xl border ">
						<FiCode className="text-3xl mb-4 text-amber-300" />
						<h4 className="text-xl text-green-500 font-semibold mb-3">
							Modern Web Development
						</h4>
						<p className="text-gray-500">
							Learn HTML, CSS, JavaScript, React, backend
							fundamentals, and modern tooling through real-world
							projects.
						</p>
					</div>
					<div className=" border-gray-800 bg-white p-8 hover:border-green-400 border transition rounded-2xl">
						<FiLayers className="text-3xl mb-4 text-indigo-600" />
						<h4 className="text-xl text-orange-500 font-semibold mb-3">
							DSA & Problem Solving
						</h4>
						<p className="text-gray-500">
							Build strong logical thinking with data structures,
							algorithms, and interview-focused problem-solving
							techniques.
						</p>
					</div>
					<div className=" border-gray-800 bg-white p-8 hover:border-green-400 border transition rounded-2xl">
						<FiBookOpen className="text-3xl text-cyan-400 mb-4" />
						<h4 className="text-xl text-purple-500 font-semibold mb-3">
							Career Preparation
						</h4>
						<p className="text-gray-500">
							Resume building, interview preparation, system
							thinking, and guidance aligned with service-based
							and product companies.
						</p>
					</div>
				</div>
			</section>

			{/* ================= HOW WE TEACH ================= */}
			<section className=" bg-white p-8 hover:border-green-400 transition py-16">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-3xl md:text-4xl font-bold mb-10 font-orbitron text-pink-600">
						How We Teach
					</h2>
					<div className="grid md:grid-cols-2 gap-12 text-gray-500">
						<p>
							Our teaching methodology is built around clarity,
							repetition, and application. Every concept is broken
							down into simple ideas, followed by guided practice
							and real-world usage.
						</p>
						<p>
							We emphasize consistency and long-term growth rather
							than quick hacks. Learners are encouraged to build
							daily habits, reflect on mistakes, and continuously
							improve through structured feedback.
						</p>
					</div>
				</div>
			</section>

			{/* ================= COMMUNITY & MENTORSHIP ================= */}
			<section className="max-w-6xl mx-auto px-6 py-24">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 font-orbitron text-pink-600">
					Community & Mentorship
				</h2>
				<p className="text-gray-500 leading-relaxed max-w-4xl">
					Codeemy is more than a learning platform — it’s a growing
					community of learners, mentors, and builders. Our
					mentorship-driven approach helps students stay accountable,
					overcome doubts, and learn from real industry experiences.
				</p>
			</section>

			{/* ================= WHY CODEEMY ================= */}
			<section className="bg-white p-8 hover:border-green-400 transition py-24 ">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-3xl md:text-4xl font-bold mb-10 font-orbitron text-pink-600">
						Why Codeemy?
					</h2>
					<ul className="grid md:grid-cols-2 gap-6 text-gray-500">
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>Structured
							learning paths with clear outcomes
						</li>
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>
							Beginner-friendly explanations with depth
						</li>
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>Focus on
							service-based and IT company exams
						</li>
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>Hands-on
							projects and practical assignments
						</li>
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>Mentor
							guidance and community support
						</li>
						<li className="flex gap-1">
							<span className="text-green-500">✔</span>Long-term
							skill development mindset
						</li>
					</ul>
				</div>
			</section>

			{/* ================= FUTURE ROADMAP ================= */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 font-orbitron text-pink-600">
					Our Roadmap
				</h2>
				<p className="text-gray-500 leading-relaxed max-w-4xl">
					We are continuously expanding Codeemy with advanced courses,
					real project collaborations, certification programs, and
					deeper mentorship opportunities. Our roadmap is guided by
					one goal — to help learners stay relevant in a rapidly
					evolving tech industry.
				</p>
			</section>

			{/* ================= CTA ================= */}
			<section className="py-24 text-center px-6">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 font-orbitron text-pink-600">
					Start Your Learning Journey with Codeemy
				</h2>
				<p className="text-gray-500 max-w-3xl mx-auto mb-8">
					Whether you are starting from zero or refining your skills,
					Codeemy provides the structure, support, and clarity you
					need to move forward with confidence.
				</p>
				<Link to={user ? "/dashboard/my-profile" : "/login"}>
					<button className="px-10 py-4 rounded-full shadow-sm bg-primary   font-semibold hover:opacity-90 transition cursor-pointer text-white font-orbitron">
						Get's started
					</button>
				</Link>
			</section>
		</div>
	);
}
