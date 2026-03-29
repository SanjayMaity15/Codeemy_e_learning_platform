import React from "react";
import {
	FaRocket,
	FaBrain,
	FaProjectDiagram,
	FaChartLine,
} from "react-icons/fa";

export default function WhyChooseUs() {
	return (
		<section className="text-white md:py-20 px-6">
			<div className="max-w-6xl mx-auto">
				{/* Heading */}
				<h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-orbitron text-gray-500">
					Why Learn With{" "}
					<span className="bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
						Codeemy
					</span>
				</h2>
				<p className="text-gray-500 text-center max-w-2xl mx-auto mb-14">
					Upgrade your skills with industry-focused learning,
					real-world projects, and smart tools designed to accelerate
					your tech career.
				</p>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Card 1 */}
					<div className="rounded-2xl border border-pink-800 bg-white hover:bg-pink-50 p-8 hover:border-green-400 transition">
						<FaRocket className="text-pink-400 text-4xl mb-4" />
						<h3 className="text-xl text-pink-600 font-semibold mb-2">
							Career-Oriented Learning
						</h3>
						<p className="text-gray-500">
							Learn skills that companies actually hire for — from
							fundamentals to advanced concepts with clear career
							paths.
						</p>
					</div>

					{/* Card 2 */}
					<div className="rounded-2xl border border-indigo-800 bg-white p-8 hover:border-green-400 transition hover:bg-indigo-50">
						<FaBrain className="text-indigo-400 text-4xl mb-4" />
						<h3 className="text-xl text-primary font-semibold mb-2">
							Smart Learning Assistance
						</h3>
						<p className="text-gray-500">
							Get instant help, explanations, and guidance
							whenever you’re stuck — so learning never slows
							down.
						</p>
					</div>

					{/* Card 3 */}
					<div className="rounded-2xl border border-indigo-800 bg-white p-8 hover:border-green-400 transition hover:bg-indigo-50">
						<FaProjectDiagram className="text-indigo-400 text-4xl mb-4" />
						<h3 className="text-xl text-primary font-semibold mb-2">
							Real-World Projects
						</h3>
						<p className="text-gray-500">
							Build practical projects that strengthen your
							portfolio and prepare you for real development
							environments.
						</p>
					</div>

					{/* Card 4 */}
					<div className="rounded-2xl border border-pink-800 bg-white p-8 hover:border-green-400 transition hover:bg-pink-50">
						<FaChartLine className="text-pink-400 text-4xl mb-4" />
						<h3 className="text-xl text-pink-600 font-semibold mb-2">
							Track Your Growth
						</h3>
						<p className="text-gray-500">
							Monitor your progress, stay motivated, and see how
							far you’ve come with clear learning milestones.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
