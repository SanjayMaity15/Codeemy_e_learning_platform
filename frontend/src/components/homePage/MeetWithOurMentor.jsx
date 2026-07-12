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

	

	return (
		<section
			className="text-black py-20 section-container"
			ref={meetOurMentorRef}
		>
			<div className="max-w-7xl mx-auto">
				<div className="mb-16 text-center">
					<span className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
						OUR EXPERTS
					</span>

					<h2 className="mt-6 text-4xl font-bold md:text-5xl font-orbitron text-slate-900">
						Learn From{" "}
						<span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							Industry Experts
						</span>
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
						Learn from experienced professionals who have helped
						thousands of students build successful careers in
						software development.
					</p>
				</div>

				{/* ✅ Swiper */}
				<Swiper
					modules={[Pagination, Autoplay]}
					spaceBetween={35}
					slidesPerView={1}
					loop
					speed={900}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1200: {
							slidesPerView: 3,
						},
					}}
				>
					{instructors.map((instructor, index) => (
						<SwiperSlide key={index}>
							<div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ">
								{/* Gradient Background */}
								<div
									className={`relative h-36 ${
										index % 2 === 0
											? "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500"
											: "bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600"
									}`}
								>
									{/* Decorative Circle */}
									<div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10"></div>

									<div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
										<div className="relative">
											<img
												src={instructor.image}
												alt={instructor.firstName}
												className="h-28 w-28 rounded-full border-[5px] border-white object-cover shadow-xl"
											/>

											{/* Rating Badge */}
											<div className="absolute -right-2 bottom-1 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-white shadow-lg">
												⭐ {instructor.avgRating}
											</div>
										</div>
									</div>
								</div>

								{/* Body */}
								<div className="px-6 pb-7 pt-20 text-center">
									<h3 className="text-2xl font-bold text-slate-800">
										{instructor.firstName}{" "}
										{instructor.lastName}
									</h3>

									<p className="mt-1 text-sm text-slate-500">
										Professional Instructor
									</p>

									{/* Verified */}
									<div className="mt-4">
										{instructor.approved ? (
											<span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
												✔ Verified Instructor
											</span>
										) : (
											<span className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-600">
												Pending Verification
											</span>
										)}
									</div>

									{/* Stats */}
									<div className="mt-7 grid grid-cols-3 gap-3">
										<div className="rounded-2xl bg-indigo-50 p-4 transition group-hover:bg-indigo-100">
											<MdMenuBook className="mx-auto text-2xl text-indigo-600" />
											<p className="mt-2 text-xl font-bold text-slate-800">
												{instructor.totalCourses}
											</p>
											<p className="text-xs text-slate-500">
												Courses
											</p>
										</div>

										<div className="rounded-2xl bg-purple-50 p-4 transition group-hover:bg-purple-100">
											<IoMdPerson className="mx-auto text-2xl text-purple-600" />
											<p className="mt-2 text-xl font-bold text-slate-800">
												{instructor.totalStudents}
											</p>
											<p className="text-xs text-slate-500">
												Students
											</p>
										</div>

										<div className="rounded-2xl bg-yellow-50 p-4 transition group-hover:bg-yellow-100">
											<FaStar className="mx-auto text-2xl text-yellow-500" />
											<p className="mt-2 text-xl font-bold text-slate-800">
												{instructor.avgRating}
											</p>
											<p className="text-xs text-slate-500">
												Rating
											</p>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
