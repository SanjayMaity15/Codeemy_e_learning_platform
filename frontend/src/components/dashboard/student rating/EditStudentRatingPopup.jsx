import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import ButtonLoader from "../../common/ButtonLoader";

export const EditStudentRatingPopup = ({ reviewId, onclose }) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleEditRating(e) {
		e.preventDefault();

        try {
            setLoading(true)
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}profile/edit-review`,
				{ rating, review, reviewId },
				{ withCredentials: true },
			);
			toast.success(res.data.message);
            setLoading(false)
            onclose()
        } catch (error) {
            
            toast.error(error.response.data.message);
            setLoading(false)
		}
	}

	return (
		<div
			className="fixed w-full h-full top-0 left-0 z-1000 bg-black/50 backdrop-blur-sm flex justify-center items-center"
			onClick={onclose}
		>
			<div
				className="w-lg bg-white p-4 rounded-md shadow-md"
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className="text-center text-xl font-semibold">
					EDIT RATING & REVIEWS
				</h3>

				<form className="mt-6" onSubmit={handleEditRating}>
					<div className="flex gap-2 mb-4">
						{[1, 2, 3, 4, 5].map((star) => (
							<FaStar
								key={star}
								size={20}
								onClick={() => setRating(star)}
								className={`cursor-pointer transition ${
									star <= rating
										? "text-yellow-400"
										: "text-gray-400"
								}`}
							/>
						))}
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="review">Write review</label>
						<textarea
							name="review"
							id="review"
							className="outline-1 outline-primary focus:outline-2 rounded-md p-2"
							value={review}
							onChange={(e) => setReview(e.target.value)}
						></textarea>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="flex bg-primary hover:bg-indigo-700 transition-colors duration-200 cursor-pointer mt-6 px-6 py-2 rounded-md items-center text-white gap-2 "
						>
							{loading ? (
								<ButtonLoader text="Submitting"/>
							) : (
								<span className="flex items-center gap-1">
									Submit <IoSendSharp />
								</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
