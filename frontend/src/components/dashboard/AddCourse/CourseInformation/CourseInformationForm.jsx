import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { setCourse, setStep } from "../../../../feature/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementsField";
import axios from "axios";

export default function CourseInformationForm() {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { course, editCourse } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}course/showAllCategories`,
				);

				setCourseCategories(response.data.data);
			} catch (error) {
				console.log("COURSE_CATEGORY_API API ERROR............", error);
				toast.error(error.message);
			}
		};
		// if form is in edit mode
		if (editCourse) {
			
			setValue("courseTitle", course.courseName);
			setValue("courseShortDesc", course.courseDescription);
			setValue("coursePrice", course.price);
			setValue("courseTags", course.tag);
			setValue("courseBenefits", course.whatYouWillLearn);
			setValue("courseCategory", course.category);
			setValue("courseRequirements", course.instructions);
			setValue("courseImage", course.thumbnail);
		}
		getCategories();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();

		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseShortDesc !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseTags.toString() !== course.tag.toString() ||
			currentValues.courseBenefits !== course.whatYouWillLearn ||
			currentValues.courseCategory._id !== course.category._id ||
			currentValues.courseRequirements.toString() !==
				course.instructions.toString() ||
			currentValues.courseImage !== course.thumbnail
		) {
			return true;
		}
		return false;
	};

	//   handle next button click
	const onSubmit = async (data) => {
		

		if (editCourse) {
			
			if (isFormUpdated()) {
				const currentValues = getValues();
				const formData = new FormData();
				
				formData.append("courseId", course._id);
				if (currentValues.courseTitle !== course.courseName) {
					formData.append("courseName", data.courseTitle);
				}
				if (
					currentValues.courseShortDesc !== course.courseDescription
				) {
					formData.append("courseDescription", data.courseShortDesc);
				}
				if (currentValues.coursePrice !== course.price) {
					formData.append("price", data.coursePrice);
				}
				if (
					currentValues.courseTags.toString() !==
					course.tag.toString()
				) {
					formData.append("tag", JSON.stringify(data.courseTags));
				}
				if (currentValues.courseBenefits !== course.whatYouWillLearn) {
					formData.append("whatYouWillLearn", data.courseBenefits);
				}
				if (currentValues.courseCategory._id !== course.category._id) {
					formData.append("category", data.courseCategory);
				}
				if (
					currentValues.courseRequirements.toString() !==
					course.instructions.toString()
				) {
					formData.append(
						"instructions",
						JSON.stringify(data.courseRequirements),
					);
				}
				if (currentValues.courseImage !== course.thumbnail) {
					formData.append("thumbnailImage", data.courseImage);
				}
				
				setLoading(true);
				const result = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/editCourse`,
					formData,
					{ withCredentials: true },
				);
				setLoading(false);
				if (result) {
					dispatch(setStep(2));
					dispatch(setCourse(result.data.data));
				}
			} else {
				toast.error("No changes made to the form");
			}
			return;
		}

		const formData = new FormData();
		formData.append("courseName", data.courseTitle);
		formData.append("courseDescription", data.courseShortDesc);
		formData.append("price", data.coursePrice);
		formData.append("tag", JSON.stringify(data.courseTags));
		formData.append("whatYouWillLearn", data.courseBenefits);
		formData.append("category", data.courseCategory);
		formData.append("status", COURSE_STATUS.DRAFT);
		formData.append(
			"instructions",
			JSON.stringify(data.courseRequirements),
		);
		formData.append("thumbnailImage", data.courseImage);
		try {
			setLoading(true);
			const result = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/createCourse`,
				formData,
				{ withCredentials: true },
			);

			if (result) {
				dispatch(setStep(2));
				dispatch(setCourse(result.data.data));
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

return (
	<form
		onSubmit={handleSubmit(onSubmit)}
		className="space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-200"
	>
		{/* Header */}
		<div className="border-b pb-5">
			<h2 className="text-3xl font-bold text-gray-900">
				Course Information
			</h2>

			<p className="mt-2 text-gray-500">
				Fill in the details to create a professional course.
			</p>
		</div>

		{/* Course Title */}
		<div className="space-y-2">
			<label
				htmlFor="courseTitle"
				className="font-semibold text-gray-700"
			>
				Course Title
				<span className="text-red-500">*</span>
			</label>

			<input
				id="courseTitle"
				placeholder="Enter your course title"
				{...register("courseTitle", { required: true })}
				className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
			/>

			{errors.courseTitle && (
				<p className="text-sm text-red-500">Course title is required</p>
			)}
		</div>

		{/* Description */}
		<div className="space-y-2">
			<label
				htmlFor="courseShortDesc"
				className="font-semibold text-gray-700"
			>
				Course Description
				<span className="text-red-500">*</span>
			</label>

			<textarea
				rows={5}
				id="courseShortDesc"
				placeholder="Describe your course..."
				{...register("courseShortDesc", { required: true })}
				className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
			/>

			{errors.courseShortDesc && (
				<p className="text-sm text-red-500">
					Course description is required
				</p>
			)}
		</div>

		{/* Price + Category */}
		<div className="grid gap-6 md:grid-cols-2">
			{/* Price */}
			<div className="space-y-2">
				<label
					htmlFor="coursePrice"
					className="font-semibold text-gray-700"
				>
					Course Price
					<span className="text-red-500">*</span>
				</label>

				<div className="relative">
					<input
						id="coursePrice"
						placeholder="499"
						{...register("coursePrice", {
							required: true,
							valueAsNumber: true,
							pattern: {
								value: /^(0|[1-9]\d*)(\.\d+)?$/,
							},
						})}
						className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
					/>

					<HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
				</div>

				{errors.coursePrice && (
					<p className="text-sm text-red-500">Price is required</p>
				)}
			</div>

			{/* Category */}
			<div className="space-y-2">
				<label
					htmlFor="courseCategory"
					className="font-semibold text-gray-700"
				>
					Category
					<span className="text-red-500">*</span>
				</label>

				<select
					id="courseCategory"
					defaultValue=""
					{...register("courseCategory", {
						required: true,
					})}
					className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
				>
					<option value="" disabled>
						Select Category
					</option>

					{!loading &&
						courseCategories?.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
				</select>

				{errors.courseCategory && (
					<p className="text-sm text-red-500">Category is required</p>
				)}
			</div>
		</div>

		{/* Tags */}
		<div className="rounded-xl border bg-gray-50 p-5">
			<ChipInput
				label="Tags"
				name="courseTags"
				placeholder="Enter a tag and press Enter"
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
			/>
		</div>

		{/* Thumbnail */}
		<div className="rounded-xl border bg-gray-50 p-5">
			<Upload
				name="courseImage"
				label="Course Thumbnail"
				register={register}
				setValue={setValue}
				errors={errors}
				editData={editCourse ? course?.thumbnail : null}
			/>
		</div>

		{/* Benefits */}
		<div className="space-y-2">
			<label
				htmlFor="courseBenefits"
				className="font-semibold text-gray-700"
			>
				Benefits
				<span className="text-red-500">*</span>
			</label>

			<textarea
				rows={5}
				id="courseBenefits"
				placeholder="What will students learn?"
				{...register("courseBenefits", {
					required: true,
				})}
				className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
			/>

			{errors.courseBenefits && (
				<p className="text-sm text-red-500">Benefits are required</p>
			)}
		</div>

		{/* Requirements */}
		<div className="rounded-xl border bg-gray-50 p-5">
			<RequirementsField
				name="courseRequirements"
				label="Requirements / Instructions"
				register={register}
				setValue={setValue}
				errors={errors}
				getValues={getValues}
			/>
		</div>

		{/* Footer Buttons */}
		<div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-white pt-6 md:flex-row md:justify-end">
			{editCourse && (
				<button
					type="button"
					onClick={() => dispatch(setStep(2))}
					disabled={loading}
					className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
				>
					Continue Without Saving
				</button>
			)}

			<IconBtn
				disabled={loading}
				loading={loading}
				text={!editCourse ? "Next Step" : "Save Changes"}
				customClasses="rounded-xl px-8 py-3"
			>
				<MdNavigateNext size={20} />
			</IconBtn>
		</div>
	</form>
);
}
