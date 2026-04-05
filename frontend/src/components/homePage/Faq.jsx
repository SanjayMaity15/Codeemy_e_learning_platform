import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useScrollAnim } from "../common/ScrollAnimation";
import { FaArrowRight } from "react-icons/fa";
export default function Faq() {
	const [openIndex, setOpenIndex] = useState(null);
	const faqRef = useRef(null)
	const faqs = [
		{
			question:
				"Which programming languages can I learn on the platform?",
			answer: "You can learn JavaScript, Python, Java, C++, and more with hands-on projects and real-world examples.",
		},
		{
			question: "Is this course suitable for final-year students?",
			answer: "Yes, this course is ideal for final-year students as it focuses on interview preparation, problem-solving skills, and real-world AI use cases.",
		},
		{
			question: "Will I get hands-on projects in this course?",
			answer: "Yes, you will work on multiple hands-on projects, including DSA problem-solving and AI-powered applications to strengthen practical skills.",
		},
		{
			question: "How will this course help in placements?",
			answer: "This course improves your coding skills, logical thinking, and AI knowledge, which are essential for cracking technical interviews.",
		},
		{
			question: "Will I receive a certificate after completion?",
			answer: "Yes, you will receive an industry-recognized certificate after successfully completing the course.",
		},

		{
			question: "Will this course help with product-based interviews?",
			answer: "Yes, the course is designed to prepare you for coding rounds, problem-solving interviews, and system thinking.",
		},
	];

	useScrollAnim(faqRef, {
		start: "top 75%",
		end: "top 40%",
	});

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="min-h-screen section-container text-white flex justify-center items-center px-4 pb-8" ref={faqRef}>
			<div className="max-w-3xl w-full">
				<h2 className="text-3xl md:text-5xl font-bold text-center mb-4 mt-12 font-orbitron text-gray-500">
					Frequently Asked{" "}
					<span className="bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
						Questions
					</span>
				</h2>
				<p className="text-gray-500 text-center mb-10">
					Get instant answers to the most common questions.
				</p>

				<div className="space-y-4 ">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="rounded-xl shadow-md bg-white text-black hover:border-green-400 transition overflow-hidden"
						>
							<button
								onClick={() => toggleFAQ(index)}
								className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-100 transition"
							>
								<span className="text-lg font-medium">
									{index + 1}. {faq.question}
								</span>
								<FiChevronDown
									className={`w-5 h-5 transition-transform duration-300 ${
										openIndex === index ? "rotate-180" : ""
									}`}
								/>
							</button>

							{openIndex === index && (
								<div className="px-6 pb-4 text-gray-500 flex gap-2">
									<div className="flex items-start mt-1 text-green-500">
										<FaArrowRight/>
									</div>
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
