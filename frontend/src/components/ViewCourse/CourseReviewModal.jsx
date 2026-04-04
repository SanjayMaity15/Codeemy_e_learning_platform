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
		<div className="fixed inset-0 z-1000 grid h-screen w-screen place-items-center overflow-auto bg-black/50 backdrop-blur-xs">
			<div className="my-10 w-11/12 max-w-150 rounded-lg border bg-white">
				{/* Header */}
				<div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
					<p className="text-xl font-semibold text-black-5">
						Add Review
					</p>
					<button onClick={() => setReviewModal(false)}>
						<RxCross2 className="text-2xl text-black-5" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6">
					{/* User Info */}
					<div className="flex items-center justify-center gap-4">
						<img
							src={user?.image}
							alt="profile"
							className="aspect-square w-12 rounded-full object-cover"
						/>
						<div>
							<p className="font-semibold text-black-5">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-sm text-black-5">
								Posting Publicly
							</p>
						</div>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-6 flex flex-col items-center"
					>
						{/* ⭐ Star Rating */}
						<div className="flex gap-2 mb-4">
							{[1, 2, 3, 4, 5].map((star) => (
								<FaStar
									key={star}
									size={30}
									onClick={() => handleRating(star)}
									className={`cursor-pointer transition ${
										star <= rating
											? "text-yellow-400"
											: "text-gray-400"
									}`}
								/>
							))}
						</div>

						{/* Textarea */}
						<div className="flex w-11/12 flex-col space-y-2">
							<label
								className="text-sm text-black-5"
								htmlFor="courseExperience"
							>
								Add Your Experience{" "}
								<sup className="text-pink-200">*</sup>
							</label>

							<textarea
								id="courseExperience"
								placeholder="Add Your Experience"
								{...register("courseExperience", {
									required: true,
								})}
								className="form-style min-h-32.5 w-full resize-none p-1 bg-white px-4 rounded-2xl focus:outline-primary outline"
							/>

							{errors.courseExperience && (
								<span className="ml-2 text-xs text-pink-200">
									Please Add Your Experience
								</span>
							)}
						</div>

						{/* Buttons */}
						<div className="mt-6 flex w-11/12 justify-end gap-2">
							<button
								type="button"
								onClick={() => setReviewModal(false)}
								className="rounded-md bg-gray-300 py-2 px-5 font-semibold text-black-900"
							>
								Cancel
							</button>

							<IconBtn text={loading ? "Submitting" : "Submit"} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
