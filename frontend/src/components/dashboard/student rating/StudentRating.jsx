import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { EditStudentRatingPopup } from "./EditStudentRatingPopup";
import ConfirmationModal from "../../common/ConfirmationModal";
import toast from "react-hot-toast";

const StudentRating = () => {
	const [studentRatings, setStudentRatings] = useState([]);
	const [openEditRatingModel, setOpenEditRatingModel] = useState(null);
	const [modalData, setModalData] = useState(null);
	const [loading, setLoading] = useState(false);

	async function fetchStudentRatings() {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}profile/all-reviews`,
				{ withCredentials: true },
			);

			setStudentRatings(res?.data?.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDeleteRating(reviewId) {
		try {
			setLoading(true);
			const res = await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}profile/delete-review/${reviewId}`,
				{ withCredentials: true },
			);
			toast.success(res?.data?.message);
			setLoading(false);
			setModalData(null);
			fetchStudentRatings();
		} catch (error) {
			toast.error(error?.response?.data?.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchStudentRatings();
	}, []);

	return (
		<div className="w-full">
			<div className="mb-8">
				<h3 className="text-3xl font-bold font-orbitron text-gray-700">
					My{" "}
					<span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
						Ratings & Reviews
					</span>
				</h3>
				<p className="mt-2 text-gray-500">
					Manage the ratings and reviews you've submitted.
				</p>
			</div>

			<ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{studentRatings?.map((rating) => (
					<li
						key={rating._id}
						className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex justify-between gap-5"
					>
						<div className="flex flex-col flex-1">
							<p className="text-sm text-gray-500 mb-1">Course</p>

							<h4 className="text-lg font-semibold text-primary line-clamp-2">
								{rating.course.courseName}
							</h4>

							<div className="flex items-center gap-1 mt-3">
								{Array.from({ length: 5 }).map((_, i) =>
									i + 1 <= rating.rating ? (
										<FaStar
											key={i}
											className="text-yellow-400 text-lg"
										/>
									) : (
										<FaRegStar
											key={i}
											className="text-gray-300 text-lg"
										/>
									),
								)}
							</div>

							<p className="mt-4 text-gray-600 leading-relaxed">
								{rating.review}
							</p>

							<div className="mt-5 h-1 w-0 bg-primary rounded-full group-hover:w-full transition-all duration-500"></div>
						</div>

						<div className="flex flex-col gap-3">
							<button
								className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-500 hover:text-white text-yellow-600 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
								onClick={() =>
									setOpenEditRatingModel(rating._id)
								}
							>
								<FaEdit />
							</button>

							<button
								disabled={loading}
								className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-500 hover:text-white text-red-600 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm disabled:opacity-50"
								onClick={() => {
									setModalData({
										text1: "Do you want to delete this rating & review?",
										text2: "From the course also rating and review will be deleted",
										btn1Text: "Delete",
										btn2Text: "Cancel",
										loadingText: "Deleting",
										btn1Handler: () =>
											handleDeleteRating(rating._id),

										btn2Handler: () => setModalData(null),
									});
								}}
							>
								<FaTrash />
							</button>
						</div>
					</li>
				))}
			</ul>

			{studentRatings.length === 0 && (
				<div className="mt-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 py-16">
					<h3 className="text-2xl font-semibold text-gray-700">
						No Reviews Yet
					</h3>
					<p className="mt-2 text-gray-500">
						Complete a course and share your experience.
					</p>
				</div>
			)}

			{openEditRatingModel && (
				<EditStudentRatingPopup
					reviewId={openEditRatingModel}
					onclose={() => setOpenEditRatingModel(null)}
				/>
			)}

			{modalData && <ConfirmationModal modalData={modalData} />}
		</div>
	);
};

export default StudentRating;
