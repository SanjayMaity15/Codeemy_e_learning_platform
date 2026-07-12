import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
	setCourse,
	setEditCourse,
	setStep,
} from "../../../../feature/courseSlice";

import IconBtn from "../../../common/IconBtn";
import NestedView from "./NestedView";
import axios from "axios";

export default function CourseBuilderForm() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const { course } = useSelector((state) => state.course);

	const [loading, setLoading] = useState(false);
	const [editSectionName, setEditSectionName] = useState(null);

	const dispatch = useDispatch();

	// ===================================
	// Create / Edit Section
	// ===================================

	const onSubmit = async (data) => {
		setLoading(true);

		let result;

		try {
			if (editSectionName) {
				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/updateSection`,
					{
						sectionName: data.sectionName,
						sectionId: editSectionName,
						courseId: course._id,
					},
					{
						withCredentials: true,
					},
				);

				result = response.data.data;
			} else {
				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/addSection`,
					{
						sectionName: data.sectionName,
						courseId: course._id,
					},
					{
						withCredentials: true,
					},
				);

				result = response.data.updatedCourse;
			}

			if (result) {
				dispatch(setCourse(result));
				setEditSectionName(null);
				setValue("sectionName", "");
			}
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Something went wrong",
			);
		} finally {
			setLoading(false);
		}
	};

	// ===================================
	// Cancel Edit
	// ===================================

	const cancelEdit = () => {
		setEditSectionName(null);
		setValue("sectionName", "");
	};

	const handleChangeEditSectionName = (
		sectionId,
		sectionName,
	) => {
		if (editSectionName === sectionId) {
			cancelEdit();
			return;
		}

		setEditSectionName(sectionId);
		setValue("sectionName", sectionName);
	};

	// ===================================
	// Navigation
	// ===================================

	const goToNext = () => {
		if (course.courseContent.length === 0) {
			toast.error("Please add at least one section.");
			return;
		}

		if (
			course.courseContent.some(
				(section) => section.subSection.length === 0,
			)
		) {
			toast.error(
				"Please add at least one lecture in every section.",
			);
			return;
		}

		dispatch(setStep(3));
	};

	const goBack = () => {
		dispatch(setStep(1));
		dispatch(setEditCourse(true));
	};

	return (
		<div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-200">

			{/* Header */}

			<div className="mb-8 flex items-center justify-between">

				<div>

					<h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
						<FaBookOpen className="text-indigo-600" />
						Course Builder
					</h2>

					<p className="mt-2 text-gray-500">
						Create sections and organize your
						course content.
					</p>

				</div>

				<div className="rounded-xl bg-indigo-50 px-4 py-2">

					<p className="text-xs uppercase tracking-wide text-gray-500">
						Sections
					</p>

					<p className="text-center text-2xl font-bold text-indigo-600">
						{course.courseContent.length}
					</p>

				</div>

			</div>

			{/* Form */}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5"
			>

				<div>

					<label
						htmlFor="sectionName"
						className="mb-2 block text-sm font-semibold text-gray-700"
					>
						Section Name
					</label>

					<input
						id="sectionName"
						disabled={loading}
						placeholder="e.g. Introduction to React"
						{...register("sectionName", {
							required: true,
						})}
						className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
					/>

					{errors.sectionName && (
						<p className="mt-2 text-sm text-red-500">
							Section name is required.
						</p>
					)}

				</div>

				<div className="flex flex-wrap items-center gap-4">

					<IconBtn
						type="submit"
						disabled={loading}
						loading={loading}
						text={
							editSectionName
								? "Update Section"
								: "Add Section"
						}
						customClasses="rounded-xl px-6 py-3"
					>
						<IoAddCircleOutline size={22} />
					</IconBtn>

					{editSectionName && (
						<button
							type="button"
							onClick={cancelEdit}
							className="rounded-xl border border-red-300 px-5 py-3 text-red-600 transition hover:bg-red-50"
						>
							Cancel Edit
						</button>
					)}

				</div>

			</form>

			<div className="my-8 border-t border-gray-200"></div>			{/* Sections */}

			{course.courseContent.length > 0 ? (
				<div>

					<div className="mb-5 flex items-center justify-between">

						<h3 className="text-xl font-semibold text-gray-800">
							Course Sections
						</h3>

						<span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
							{course.courseContent.length} Total
						</span>

					</div>

					<div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
						<NestedView
							handleChangeEditSectionName={
								handleChangeEditSectionName
							}
						/>
					</div>

				</div>
			) : (
				<div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-20 text-center">

					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">

						<FaBookOpen className="text-4xl text-indigo-600" />

					</div>

					<h3 className="mt-6 text-2xl font-bold text-gray-700">
						No Sections Added
					</h3>

					<p className="mx-auto mt-3 max-w-md text-gray-500">
						Start building your course by creating your
						first section. Each section can contain
						multiple lectures, quizzes, and resources.
					</p>

				</div>
			)}

			{/* Bottom Buttons */}

			<div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-8">

				<button
					onClick={goBack}
					className="rounded-xl border border-gray-300 px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
				>
					← Back
				</button>

				<IconBtn
					disabled={loading}
					text="Continue"
					onclick={goToNext}
					customClasses="rounded-xl px-8 py-3 shadow-lg"
				>
					<MdNavigateNext size={22} />
				</IconBtn>

			</div>

		</div>
	);
}