import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

import { setCourse, setEditCourse } from "../../../../feature/courseSlice";
import RenderSteps from "../RenderSteps";
import Loader from "../../../common/Loader";
import axios from "axios";

export default function EditCourse() {
	const dispatch = useDispatch();
	const { courseId } = useParams();

	const { course } = useSelector((state) => state.course);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);

				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}course/getFullCourseDetails`,
					{ courseId },
					{
						withCredentials: true,
					},
				);

				const result = response.data.data;

				if (result?.courseDetails) {
					dispatch(setEditCourse(true));
					dispatch(setCourse(result.courseDetails));
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="mx-auto max-w-7xl px-6 py-8">
			{/* Header */}

			<div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
						<div className="rounded-xl bg-indigo-100 p-3">
							<FiEdit3 className="text-2xl text-indigo-600" />
						</div>
						Edit Course
					</h1>

					<p className="mt-2 text-gray-500">
						Update your course details, lectures and publish
						settings.
					</p>
				</div>
			</div>

			{/* Body */}

			{course ? (
				<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
					<RenderSteps />
				</div>
			) : (
				<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-red-300 bg-red-50 py-20">
					<div className="rounded-full bg-red-100 p-5">
						<MdErrorOutline className="text-5xl text-red-500" />
					</div>

					<h2 className="mt-6 text-2xl font-bold text-gray-900">
						Course Not Found
					</h2>

					<p className="mt-2 text-gray-500">
						The course you're trying to edit doesn't exist or has
						been removed.
					</p>
				</div>
			)}
		</div>
	);
}
