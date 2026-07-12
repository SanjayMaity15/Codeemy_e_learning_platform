import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper/modules";

import Course_Card from "./Course_Card";

function Course_Slider({ Courses, id }) {
return (
	<>
		{Courses?.length ? (
			<div className="relative w-full">
				{/* Swiper */}
				<Swiper
					slidesPerView={1}
					spaceBetween={24}
					loop={Courses.length > 1}
					freeMode={true}
					grabCursor={true}
					navigation={{
						prevEl: `.custom-prev-${id}`,
						nextEl: `.custom-next-${id}`,
					}}
					modules={[FreeMode, Navigation]}
					breakpoints={{
						640: {
							slidesPerView: Math.min(2, Courses.length),
						},
						1024: {
							slidesPerView: Math.min(3, Courses.length),
						},
						1280: {
							slidesPerView: Math.min(4, Courses.length),
						},
					}}
					className="py-4"
				>
					{Courses.map((course) => (
						<SwiperSlide key={course._id}>
							<div className="group">
								<Course_Card
									course={course}
									Height={"h-[250px]"}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Navigation */}
				<div className="mt-8 flex items-center justify-center gap-5">
					<button
						className={`custom-prev-${id} flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white`}
					>
						←
					</button>

					<div className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-600">
						{Courses.length} Courses
					</div>

					<button
						className={`custom-next-${id} flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:translate-x-1 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white`}
					>
						→
					</button>
				</div>
			</div>
		) : (
			<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-20">
				<div className="mb-4 text-6xl">📚</div>

				<h3 className="text-2xl font-bold text-gray-700">
					No Courses Available
				</h3>

				<p className="mt-2 text-gray-500">
					New courses will appear here soon.
				</p>
			</div>
		)}
	</>
);
}

export default Course_Slider;
