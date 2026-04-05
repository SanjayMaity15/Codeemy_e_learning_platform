import React, { useEffect, useRef, useState } from "react";
import { useScrollAnim } from "../common/ScrollAnimation";
import { gsap } from "gsap";
import axios from "axios";
import { MdMenuBook } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";

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
				duration: 1.5,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: meetOurMentorRef.current,
					start: "top 80%",
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

	console.log(instructors);

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

				{/* ✅ Swiper */}
				<Swiper
					modules={[Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					pagination={{ clickable: true }}
					autoplay={{ delay: 3000 }}
					loop={true}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
				>
					{instructors.map((instructor, index) => (
						<SwiperSlide key={index}>
							<div className="card rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-200">
								{/* Top Section */}
								<div
									className={`relative bg-linear-to-r   ${index % 2 === 0 ? "from-blue-300 to-purple-400" : "from-pink-300 to-yellow-300"} h-32`}
								>
									<div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
										<img
											src={instructor.image}
											alt={instructor.name}
											className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
										/>
									</div>
								</div>

								{/* Content */}
								<div className="pt-14 px-5 pb-5 text-center">
									<h3 className="text-lg font-semibold text-gray-800">
										{instructor.firstName}{" "}
										{instructor.lastName}
									</h3>

									<p className="text-sm text-gray-500">
										Instructor
									</p>

									{/* Badge */}
									<div
										className={`mt-2 inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${instructor.approved ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
									>
										{instructor.approved
											? "✔ Verified Educator"
											: "❌ Not Verified"}
									</div>

									{/* Stats */}
									<div className="flex justify-between items-center mt-5 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600">
										<div className="text-center">
											<p className="font-semibold text-gray-800">
												{instructor.totalCourses}
											</p>
											<div className="flex items-center gap-1">
												<MdMenuBook className="text-xl text-orange-500 mb-1" />
												<p>Courses</p>
											</div>
										</div>

										<div className="text-center">
											<p className="text-green-500 font-medium">
												{instructor.totalStudents}
											</p>
											<div className="flex items-center gap-1">
												<IoMdPerson className="text-lg text-purple-500 mb-1" />
												<p>Students</p>
											</div>
										</div>

										<div className="text-center">
											<p className="font-semibold text-yellow-500">
												{instructor.avgRating}
											</p>
											<div className="flex items-center gap-1">
												<FaStar className="text-lg text-cyan-500 mb-1" />
												<p className="text-xs">
													Rating
												</p>
											</div>
										</div>
									</div>

									{/* About */}
									<p className="mt-4 text-sm text-gray-500 line-clamp-2">
										{instructor.additionalDetails.about}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
