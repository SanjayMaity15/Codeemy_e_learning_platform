import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setCourse, setEditCourse } from "../../../../feature/courseSlice";
import RenderSteps from "../RenderSteps";
import axios from "axios";

export default function EditCourse() {
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const { course } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.auth);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/getFullCourseDetails`,
				{ courseId },
				{ withCredentials: true },
			);

			const result = response.data.data;

			if (result?.courseDetails) {
				dispatch(setEditCourse(true));
				dispatch(setCourse(result?.courseDetails));
			}
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<div className="grid flex-1 place-items-center">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className="">
			<h1 className="mb-14 text-2xl font-semibold">Edit Course</h1>
			<div className="mx-auto max-w-150">
				{course ? (
					<RenderSteps />
				) : (
					<p className="mt-14 text-center text-3xl font-semibold text-black-100">
						Course not found
					</p>
				)}
			</div>
		</div>
	);
}
