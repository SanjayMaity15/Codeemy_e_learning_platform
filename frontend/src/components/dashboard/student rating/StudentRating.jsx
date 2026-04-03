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
    const [loading, setLoading] = useState(false)

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
            setModalData(null)
            fetchStudentRatings()
		} catch (error) {
			toast.error(error?.response?.data?.message);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchStudentRatings();
	}, []);

	return (
		<div>
			<h3 className="text-2xl font-semibold ">Ratings and Reviews</h3>

			<ul className="grid sm:grid-cols-2 gap-4 mt-6">
				{studentRatings?.map((rating) => (
					<li
						key={rating._id}
						className="bg-white p-4 flex justify-between gap-1"
					>
						<div className="flex flex-col gap-1">
							<p className="text-black font-semibold">
								Course Name:{" "}
								<span className="text-primary font-medium">
									{rating.course.courseName}
								</span>
							</p>
							<p className="flex">
								{Array.from({ length: 5 }).map((_, i) =>
									i + 1 <= rating.rating ? (
										<FaStar
											key={i}
											className="text-yellow-400"
										/>
									) : (
										<FaRegStar
											key={i}
											className="text-gray-300"
										/>
									),
								)}
							</p>
							<p>{rating.review}</p>
						</div>
						<div className="flex flex-col gap-2 text-xl">
							<button
								className="text-yellow-600 cursor-pointer"
								onClick={(e) =>
									setOpenEditRatingModel(rating._id)
								}
							>
								<FaEdit />
							</button>
							<button
								className="text-red-600 cursor-pointer"
								onClick={() => {
									
									setModalData({
										text1: "Do you want to delete this rating & review?",
										text2: "From the course also rating and review will be deleted",
										btn1Text: "Delete",
										btn2Text: "Cancel",
										loadingText: "Deleting",
										btn1Handler: () =>
											handleDeleteRating(rating._id),

										btn2Handler: () =>
											setModalData(null),
									});
								}}
							>
								<FaTrash />
							</button>
						</div>
					</li>
				))}
			</ul>

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
