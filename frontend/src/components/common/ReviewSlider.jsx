import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

import { FaRegStar, FaStar } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { FreeMode, Pagination } from "swiper/modules";
import axios from "axios";

function ReviewSlider() {
	const [reviews, setReviews] = useState([]);
	const truncateWords = 15;

	useEffect(() => {
		(async () => {
			const result = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getReviews`,
				{ withCredentials: true },
			);

			if (result?.data?.success) {
				setReviews(result?.data?.data);
			}
		})();
	}, []);

	console.log(reviews);

	return (
		<div className="w-full py-12 mb-8">
			<div className="mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mt-12 font-orbitron text-gray-500">
					Student{" "}
					<span className="bg-linear-to-b from-indigo-600  to-pink-600 bg-clip-text text-transparent">
						Reviews
					</span>
				</h2>

				<div className="px-4 lg:px-0">
					<Swiper
						slidesPerView={1}
						spaceBetween={25}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
						loop={reviews.length > 3}
						freeMode={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						modules={[FreeMode, Pagination, Autoplay]}
						className="w-full"
					>
						{reviews.map((review, i) => {
							return (
								<SwiperSlide key={i}>
									<div className="group flex min-h-50 flex-col justify-center gap-2 rounded-2xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
										{/* User Info */}
										<div className="flex items-center gap-3">
											<img
												src={
													review?.user?.image
														? review?.user?.image
														: `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
												}
												alt=""
												className="h-14 w-14 rounded-full object-cover"
											/>

											<div>
												<h3 className="font-semibold text-gray-900 text-lg">
													{`${review?.user?.firstName} ${review?.user?.lastName}`}
												</h3>
												<p className="text-xs text-gray-500">
													{review?.course?.courseName}
												</p>
											</div>
										</div>

										{/* Review Text */}
										<p className="text-sm text-gray-600 leading-relaxed">
											{review?.review.split(" ").length >
											truncateWords
												? `${review?.review
														.split(" ")
														.slice(0, truncateWords)
														.join(" ")} ...`
												: `${review?.review}`}
										</p>

										{/* Rating */}
										<div className="flex items-center gap-1 mt-2">
											{[1, 2, 3, 4, 5].map((star) => (
												<div>
													{star <= review.rating ? (
														<FaStar className="text-yellow-500" />
													) : (
														<FaRegStar />
													)}
												</div>
											))}
										</div>

										<div>
											<p className="text-xs mt-2 text-gray-400">
												Post:{" "}
												{new Date(
													review.createdAt,
												).toLocaleDateString()}
											</p>
										</div>

										{/* Accent line */}
										<div className="h-1 w-0 bg-[--color-primary] transition-all duration-300 group-hover:w-full rounded-full"></div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</div>
	);
}

export default ReviewSlider;
