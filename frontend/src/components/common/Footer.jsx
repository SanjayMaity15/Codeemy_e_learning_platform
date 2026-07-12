import {
	FaGithub,
	FaLinkedin,
	FaTwitter,
	FaArrowUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
	const navigate = useNavigate();

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="relative mt-32 overflow-hidden border-t border-gray-200 bg-linear-to-b from-white via-indigo-50/40 to-white">
			{/* Background Glow */}

			<div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-[120px]" />
			<div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-pink-300/20 blur-[120px]" />

			<div className="relative section-container py-16">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}

					<div>
						<div
							onClick={() => navigate("/")}
							className="cursor-pointer"
						>
							<h2 className="font-orbitron text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Codeemy
							</h2>
						</div>

						<p className="mt-5 leading-7 text-gray-600">
							Codeemy helps students master coding, AI, Web
							Development, DSA and modern technologies through
							industry-focused courses and real-world projects.
						</p>

						<div className="mt-6 flex gap-4">
							<a
								href="#"
								className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-600"
							>
								<FaGithub />
							</a>

							<a
								href="#"
								className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600"
							>
								<FaLinkedin />
							</a>

							<a
								href="#"
								className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:-translate-y-1 hover:border-sky-500 hover:text-sky-500"
							>
								<FaTwitter />
							</a>
						</div>
					</div>

					{/* Platform */}

					<div>
						<h3 className="mb-5 text-xl font-semibold">Platform</h3>

						<ul className="space-y-4 text-gray-600">
							<li className="cursor-pointer hover:text-indigo-600 transition">
								All Courses
							</li>

							<li className="cursor-pointer hover:text-indigo-600 transition">
								Become Instructor
							</li>

							<li className="cursor-pointer hover:text-indigo-600 transition">
								Certificates
							</li>

							<li className="cursor-pointer hover:text-indigo-600 transition">
								Learning Dashboard
							</li>
						</ul>
					</div>
					{/* Resources */}

					<div>
						<h3 className="mb-5 text-xl font-semibold">
							Resources
						</h3>

						<ul className="space-y-4 text-gray-600">
							<li className="cursor-pointer hover:text-pink-600 transition">
								Documentation
							</li>

							<li className="cursor-pointer hover:text-pink-600 transition">
								Blog
							</li>

							<li className="cursor-pointer hover:text-pink-600 transition">
								FAQs
							</li>

							<li className="cursor-pointer hover:text-pink-600 transition">
								Support
							</li>

							<li className="cursor-pointer hover:text-pink-600 transition">
								Contact Us
							</li>
						</ul>
					</div>

					{/* Newsletter */}

					<div>
						<h3 className="mb-5 text-xl font-semibold">
							Stay Updated 🚀
						</h3>

						<p className="text-gray-600 leading-7">
							Get notified whenever new courses, projects and AI
							features are launched.
						</p>

						<div className="mt-6 flex flex-col gap-3">
							<input
								type="email"
								placeholder="Enter your email"
								className="
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
py-3
outline-none
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
transition
"
							/>

							<button
								className="
rounded-xl
bg-linear-to-r
from-indigo-600
to-pink-500
py-3
font-semibold
text-white
shadow-lg
transition
hover:scale-[1.03]
hover:shadow-xl
"
							>
								Subscribe
							</button>
						</div>

						<div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
							<p className="text-sm text-gray-700 leading-6">
								📢 Join <b>10,000+</b> learners receiving new
								coding resources every week.
							</p>
						</div>
					</div>
				</div>

				{/* Divider */}

				<div className="my-12 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
				{/* Bottom */}

				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					{/* Left */}

					<div>
						<p className="text-gray-600 text-sm">
							© {new Date().getFullYear()}{" "}
							<span className="font-semibold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
								Codeemy
							</span>
							. All Rights Reserved.
						</p>

						<p className="mt-2 text-xs text-gray-500">
							Built with ❤️ for students and instructors.
						</p>
					</div>

					{/* Links */}

					<div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
						<a
							href="#"
							className="transition hover:text-indigo-600"
						>
							Privacy Policy
						</a>

						<a
							href="#"
							className="transition hover:text-indigo-600"
						>
							Terms & Conditions
						</a>

						<a
							href="#"
							className="transition hover:text-indigo-600"
						>
							Cookie Policy
						</a>

						<a
							href="#"
							className="transition hover:text-indigo-600"
						>
							Refund Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}