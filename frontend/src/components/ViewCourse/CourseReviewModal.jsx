import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

import IconBtn from "../../components/common/IconBtn";
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseReviewModal({ setReviewModal }) {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const { courseEntireData } = useSelector((state) => state.viewCourse);
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setValue("courseExperience", "");
		setValue("courseRating", 0);
	}, [setValue]);

	const handleRating = (value) => {
		setRating(value);
		setValue("courseRating", value, { shouldValidate: true });
	};

	const onSubmit = async (data) => {
		if (!data.courseRating) {
			toast.error("Please give rating first");
			return;
		}
		try {
			setLoading(true);
			const result = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/createRating`,
				{
					courseId: courseEntireData._id,
					rating: data.courseRating,
					review: data.courseExperience,
				},
				{ withCredentials: true },
			);
			toast.success(result.data.message);
			setLoading(false);
			setReviewModal(false);
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-1000 grid place-items-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
			<div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 bg-linear-to-r from-indigo-50 to-pink-50 px-6 py-5">
					<p className="text-2xl font-bold text-primary">
						Add Review
					</p>

					<button
						onClick={() => setReviewModal(false)}
						className="rounded-full p-2 transition hover:bg-gray-200"
					>
						<RxCross2 className="text-2xl text-gray-700" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 md:p-8">
					{/* User Info */}
					<div className="mb-8 flex flex-col items-center gap-3">
						<img
							src={user?.image}
							alt="profile"
							className="h-20 w-20 rounded-full border-4 border-pink-100 object-cover shadow-md"
						/>

						<div className="text-center">
							<p className="text-lg font-semibold text-gray-800">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-sm text-gray-500">
								Posting Publicly
							</p>
						</div>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* Star Rating */}
						<div className="flex justify-center gap-3">
							{[1, 2, 3, 4, 5].map((star) => (
								<FaStar
									key={star}
									size={34}
									onClick={() => handleRating(star)}
									className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
										star <= rating
											? "text-yellow-400 drop-shadow"
											: "text-gray-300 hover:text-yellow-300"
									}`}
								/>
							))}
						</div>

						{/* Textarea */}
						<div className="flex flex-col gap-2">
							<label
								htmlFor="courseExperience"
								className="font-medium text-gray-700"
							>
								Add Your Experience{" "}
								<sup className="text-pink-600">*</sup>
							</label>

							<textarea
								id="courseExperience"
								placeholder="Share your learning experience..."
								{...register("courseExperience", {
									required: true,
								})}
								className="min-h-36 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-gray-700 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
							/>

							{errors.courseExperience && (
								<span className="text-sm text-red-500">
									Please Add Your Experience
								</span>
							)}
						</div>

						{/* Buttons */}
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setReviewModal(false)}
								className="cursor-pointer rounded-lg border border-gray-300 bg-gray-100 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
							>
								Cancel
							</button>

							<IconBtn
								text={loading ? "Submitting" : "Submit Review"}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
