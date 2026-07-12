import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useScrollAnim } from "../common/ScrollAnimation";

export default function Faq() {
	const [openIndex, setOpenIndex] = useState(null);
	const faqRef = useRef(null);

	useScrollAnim(faqRef, {
		start: "top 75%",
		end: "top 40%",
	});

	const faqs = [
		{
			question:
				"Which programming languages can I learn on the platform?",
			answer: "You can learn JavaScript, Python, Java, C++, React, Node.js, MongoDB, Express, SQL and many more technologies through practical projects and real-world examples.",
		},
		{
			question: "Is this course suitable for final-year students?",
			answer: "Absolutely. The platform is specially designed for final-year students preparing for placements, internships, and software engineering careers.",
		},
		{
			question: "Will I get hands-on projects?",
			answer: "Yes. Every major course includes industry-level projects that help you build a strong portfolio and gain practical experience.",
		},
		{
			question: "How will this course help in placements?",
			answer: "You'll improve DSA, Full Stack Development, interview preparation, aptitude, and AI skills—everything required to crack modern software engineering interviews.",
		},
		{
			question: "Will I receive a certificate after completion?",
			answer: "Yes. Once you've completed all lectures and quizzes (and met the required score), you can download your professional completion certificate.",
		},
		{
			question: "Can I learn at my own pace?",
			answer: "Yes. All purchased courses are available 24/7, allowing you to learn whenever it's convenient for you.",
		},
	];

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section ref={faqRef} className="section-container py-24">
			<div className="max-w-4xl mx-auto">
				{/* Heading */}
				<div className="text-center mb-16">
					<div className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
						FAQs
					</div>

					<h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 font-orbitron leading-tight">
						Frequently Asked{" "}
						<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							Questions
						</span>
					</h2>

					<p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto">
						Everything you need to know before starting your
						learning journey with Codeemy.
					</p>
				</div>

				{/* FAQ List */}
				<div className="space-y-5">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300
							${
								openIndex === index
									? "border-indigo-500 shadow-xl"
									: "border-gray-200 hover:border-indigo-300 hover:shadow-lg"
							}`}
						>
							<button
								onClick={() => toggleFAQ(index)}
								className="flex w-full items-center justify-between px-7 py-6 text-left"
							>
								<div className="flex items-center gap-4">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all
										${
											openIndex === index
												? "bg-indigo-600 text-white"
												: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
										}`}
									>
										{index + 1}
									</div>

									<h3 className="text-lg md:text-xl font-semibold text-slate-800">
										{faq.question}
									</h3>
								</div>

								<FiChevronDown
									className={`h-6 w-6 text-indigo-600 transition-transform duration-300 ${
										openIndex === index ? "rotate-180" : ""
									}`}
								/>
							</button>

							<div
								className={`grid transition-all duration-500 ease-in-out ${
									openIndex === index
										? "grid-rows-[1fr]"
										: "grid-rows-[0fr]"
								}`}
							>
								<div className="overflow-hidden">
									<div className="border-t border-gray-100 bg-slate-50 px-7 py-6">
										<div className="flex gap-4">
											<div className="mt-1 text-indigo-600">
												<FaArrowRight />
											</div>

											<p className="leading-8 text-slate-600">
												{faq.answer}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-center shadow-2xl">
					<h3 className="text-3xl font-bold text-white">
						Still have questions?
					</h3>

					<p className="mt-3 text-indigo-100">
						Our AI Assistant is available 24/7 to guide you through
						the Codeemy platform and help you get started.
					</p>

					<button className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:scale-105 hover:shadow-lg">
						Ask AI Assistant
					</button>
				</div>
			</div>
		</section>
	);
}
