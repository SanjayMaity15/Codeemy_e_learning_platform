import React from "react";

const mentors = [
	{
		name: "Amit Sharma",
		role: "Founder & Lead instructor",
		image: "https://plus.unsplash.com/premium_photo-1683133576454-c7942fe26467?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
		bio: "Founder of Codeemy with 10+ years of experience in full-stack development and mentoring students.",
	},
	{
		name: "Neha Verma",
		role: "Co-Founder & Senior instructor",
		image: "https://plus.unsplash.com/premium_photo-1731263163362-f4740603cb3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
		bio: "Co-founder and frontend expert, passionate about UI/UX and modern web technologies.",
	},
	{
		name: "Rahul Singh ",
		role: "Co-Founder & instructor",
		image: "https://plus.unsplash.com/premium_photo-1661596640509-721f4c2e39ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
		bio: "Backend architect specializing in scalable systems and cloud infrastructure.",
	},
	{
		name: "Priya Das",
		role: "Co-Founder & instructor",
		image: "https://media.istockphoto.com/id/1181196036/photo/confident-smiling-indian-young-woman-professional-student-customer-saleswoman-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=janL_veC9rUJiqUZ3hhbrdi_L1Jg8OoElIG3IGSi4Fg=",
		bio: "Educator and mentor focusing on DSA, problem-solving, and career guidance.",
	},
];

export default function MeetWithOurMentors() {
	return (
		<section className="text-black py-20 section-container">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl text-gray-500 md:text-5xl font-bold text-center mb-14 pt-12 font-orbitron">
					Meet With Our{" "}
					<span className="bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
						Mentors
					</span>
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{mentors.map((mentor, index) => (
						<div key={index} className="perspective">
							<div className="relative h-80 w-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180 ">
								{/* Front */}
								<div className="absolute inset-0 backface-hidden rounded-lg bg-white p-8 border hover:border-primary transition flex flex-col items-center justify-center shadow-xl">
									<img
										src={mentor.image}
										alt={mentor.name}
										className="w-28 h-28 rounded-full object-cover mb-4"
									/>
									<h3 className="text-xl font-semibold">
										{mentor.name}
									</h3>
									<p className="text-neutral-500 mt-1 text-center">
										{mentor.role}
									</p>
								</div>

								{/* Back */}
								<div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white transition flex items-center justify-center text-center border hover:border-primary">
									<p className="text-sm leading-relaxed px-2 text-gray-500">
										{mentor.bio}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Custom CSS for 3D flip */}
			<style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
		</section>
	);
}
