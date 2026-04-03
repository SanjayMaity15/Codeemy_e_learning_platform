import React, { useEffect, useRef, useState } from "react";
import { useScrollAnim } from "../common/ScrollAnimation";
import { gsap } from "gsap";
import axios from "axios";

export default function MeetWithOurMentors() {
	const [instructors, setInstructors] = useState([]);
	const meetOurMentorRef = useRef(null);

	useScrollAnim(meetOurMentorRef, {
		start: "top 75%",
		end: "top 40%",
	});

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".card", {
				y: 80,
				opacity: 0,
				duration: 2,
				stagger: {
					each: 0.5,
					from: "random",
				},
				ease: "power3.out",
				scrollTrigger: {
					trigger: meetOurMentorRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			});
		}, meetOurMentorRef);

		return () => ctx.revert();
	}, []);

	async function fetchInstructors() {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/get-ins`,
			);
			setInstructors(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchInstructors();
	}, []);

	return (
		<section
			className="text-black py-20 section-container"
			ref={meetOurMentorRef}
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl text-gray-500 md:text-5xl font-bold text-center mb-14 md:pt-12 font-orbitron">
					Meet With Our{" "}
					<span className="bg-linear-to-b from-indigo-600 to-pink-600 bg-clip-text text-transparent">
						Instructors
					</span>
				</h2>

				<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
					{instructors.map((instructor, index) => (
						<div key={index} className="perspective card">
							<div className="relative h-80 w-full transition-transform duration-700 ease-in-out transform-style-preserve-3d hover:rotate-y-180">
								{/* FRONT */}
								<div className="absolute inset-0 backface-hidden rounded-2xl bg-white p-6 border border-gray-200 hover:border-indigo-400 transition-all duration-300 flex flex-col items-center justify-center shadow-md hover:shadow-xl">
									<img
										src={instructor.image}
										alt={instructor.name}
										className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-indigo-100 shadow-sm"
									/>

									<h3 className="text-lg font-semibold text-gray-800 flex gap-1">
										<span>{instructor.firstName}</span>
										<span>{instructor.lastName}</span>
									</h3>

									<p className="text-sm text-gray-500 text-center mt-1">
										{instructor.email}
									</p>

									<p className="text-sm text-gray-500 text-center">
										{instructor.additionalDetails.gender}
									</p>

									<p className="text-sm text-gray-500 text-center">
										{instructor.accountType}
									</p>

									<p className="mt-2 text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
										{instructor.courses.length} Courses
									</p>
								</div>

								{/* BACK */}
								<div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-lenear-to-br from-indigo-50 to-pink-50 transition flex items-center justify-center text-center border border-gray-200 p-4">
									<p className="text-sm leading-relaxed text-gray-600">
										{instructor.additionalDetails.about}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Custom CSS */}
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
