import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {

	const navigate = useNavigate()

	return (
		<footer className="relative bg-white pt-16 pb-8 overflow-hidden text-black z-100">
			{/* subtle top glow */}

			<div className="relative max-w-7xl mx-auto px-6 py-4">
				
				{/* Top section */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12">
					{/* Brand */}
					<div>
						<h2 className="text-2xl font-bold text-black mb-3 font-orbitron" onClick={() => navigate('/')}>
							<span className="text-3xl">C</span>odeemy
						</h2>
						<p className="text-sm text-gray-500 leading-relaxed">
							Learn DSA, Web Development, Python, and modern tech
							skills to crack interviews and build future-ready
							careers.
						</p>
					</div>

					{/* Platform */}
					<div>
						<h3 className="text-black font-semibold mb-4">
							Platform
						</h3>
						<ul className="space-y-2 text-gray-500 text-sm">
							<li className="hover:text-primary transition cursor-pointer">
								Courses
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								Mentors
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								Projects
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								Pricing
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className="text-black font-semibold mb-4">
							Resources
						</h3>
						<ul className="space-y-2 text-gray-500 text-sm">
							<li className="hover:text-primary transition cursor-pointer">
								Blog
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								FAQ
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								Support
							</li>
							<li className="hover:text-primary transition cursor-pointer">
								Community
							</li>
						</ul>
					</div>

					{/* Social */}
					<div>
						<h3 className="text-black font-semibold mb-4">
							Connect
						</h3>
						<div className="flex gap-4">
							<a className="hover:text-primary transition cursor-pointer">
								<FaGithub size={20} />
							</a>
							<a className="hover:text-primary transition cursor-pointer">
								<FaLinkedin size={20} />
							</a>
							<a className="hover:text-primary transition cursor-pointer">
								<FaTwitter size={20} />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500 gap-4">
					<p>
						© {new Date().getFullYear()} Codeemy. All rights
						reserved.
					</p>
					<div className="flex gap-6">
						<span className="hover:text-primary transition cursor-pointer">
							Privacy Policy
						</span>
						<span className="hover:text-primary transition cursor-pointer">
							Terms
						</span>
						<span className="hover:text-primary transition cursor-pointer">
							Cookies
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
