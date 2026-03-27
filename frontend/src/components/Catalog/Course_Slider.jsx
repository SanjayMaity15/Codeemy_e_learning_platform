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
				<div className="w-full">
					<Swiper
						slidesPerView={1}
						spaceBetween={20}
						loop={Courses?.length > 1}
						freeMode={true}
						grabCursor={true}
						navigation={{
							prevEl: `.custom-prev-${id}`,
							nextEl: `.custom-next-${id}`,
						}}
						modules={[FreeMode, Navigation]}
						breakpoints={{
							640: {
								slidesPerView: Math.min(2, Courses?.length),
							},
							1024: {
								slidesPerView: Math.min(3, Courses?.length),
							},
						}}
						className="w-full py-4"
					>
						{Courses?.map((course, i) => (
							<SwiperSlide key={i}>
								<Course_Card
									course={course}
									Height={"h-[250px]"}
								/>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Navigation Buttons */}
					<div className="flex justify-between gap-4 mt-6">
						<button
							className={`custom-prev-${id} px-5 py-2 rounded-lg bg-primary  text-white hover:bg-indigo-700 cursor-pointer transition`}
						>
							← Prev
						</button>

						<button
							className={`custom-next-${id} px-5 py-2 rounded-lg bg-primary text-white hover:bg-indigo-700 cursor-pointer transition`}
						>
							Next →
						</button>
					</div>
				</div>
			) : (
				<p className="text-xl text-gray-500 text-center py-10">
					No Course Found
				</p>
			)}
		</>
	);
}

export default Course_Slider;
