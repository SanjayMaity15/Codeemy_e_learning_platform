import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
import axios from "axios";

export default function Instructor() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const [loading, setLoading] = useState(false);
	const [instructorData, setInstructorData] = useState(null);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const instructorApiData = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}profile/instructorDashboard`,
				{ withCredentials: true },
			);
			const result = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}course/getInstructorCourses`,
				{ withCredentials: true },
			);
			
			if (instructorApiData.data.courses.length)
				setInstructorData(instructorApiData.data.courses);
			if (result.data.data) {
				setCourses(result.data.data);
			}
			setLoading(false);
		})();
	}, []);

	const totalAmount = instructorData?.reduce(
		(acc, curr) => acc + curr.totalAmountGenerated,
		0,
	);

	const totalStudents = instructorData?.reduce(
		(acc, curr) => acc + curr.totalStudentsEnrolled,
		0,
	);
return (
	<div className="min-h-screen bg-slate-50 p-6">
		{/* Hero Section */}

		<div className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
			<h1 className="text-4xl font-bold">
				Hi, {user?.firstName} 👋
			</h1>

			<p className="mt-2 text-white/90">
				Welcome back! Here's what's happening with your courses today.
			</p>
		</div>

		{loading ? (
			<div className="flex h-[60vh] items-center justify-center">
				<div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
			</div>
		) : courses.length > 0 ? (
			<>
				{/* Statistics */}

				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="rounded-3xl border bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
						<p className="text-sm text-gray-500">
							Total Courses
						</p>

						<h2 className="mt-3 text-4xl font-bold text-indigo-600">
							{courses.length}
						</h2>
					</div>

					<div className="rounded-3xl border bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
						<p className="text-sm text-gray-500">
							Total Students
						</p>

						<h2 className="mt-3 text-4xl font-bold text-pink-600">
							{totalStudents}
						</h2>
					</div>

					<div className="rounded-3xl border bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
						<p className="text-sm text-gray-500">
							Total Revenue
						</p>

						<h2 className="mt-3 text-4xl font-bold text-green-600">
							₹ {totalAmount}
						</h2>
					</div>
				</div>

				{/* Analytics */}

				<div className="mb-10 rounded-3xl border bg-white p-6 shadow-md">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold">
								Revenue Analytics
							</h2>

							<p className="text-sm text-gray-500">
								Track your earnings and student enrollments.
							</p>
						</div>
					</div>

					{totalAmount > 0 || totalStudents > 0 ? (
						<InstructorChart
							courses={instructorData}
						/>
					) : (
						<div className="flex h-60 items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
							<div className="text-center">
								<h3 className="text-xl font-bold text-gray-700">
									No Analytics Available
								</h3>

								<p className="mt-2 text-gray-500">
									Start enrolling students to
									visualize your statistics.
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Recent Courses */}

				<div className="rounded-3xl border bg-white p-6 shadow-md">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold">
								Your Courses
							</h2>

							<p className="text-gray-500">
								Recently created courses
							</p>
						</div>

						<Link
							to="/dashboard/my-courses"
							className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
						>
							View All
						</Link>
					</div>

					<div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
						{courses
							.slice(0, 3)
							.map((course) => (								<div
									key={course._id}
									className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
								>
									{/* Thumbnail */}
									<div className="relative overflow-hidden">
										<img
											src={course.thumbnail}
											alt={course.courseName}
											className="h-52 w-full object-fit transition duration-500 group-hover:scale-110"
										/>

										<div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1 shadow backdrop-blur">
											<p className="font-bold text-pink-600">
												₹ {course.price}
											</p>
										</div>
									</div>

									{/* Body */}
									<div className="p-6">
										<h3 className="line-clamp-2 text-xl font-bold text-gray-800 transition group-hover:text-indigo-600">
											{course.courseName}
										</h3>

										<div className="mt-3 flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-green-500"></div>

											<p className="text-xs font-semibold uppercase tracking-wider text-green-600">
												Published
											</p>
										</div>


										<div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4">
											<div>
												<p className="text-xs uppercase tracking-wider text-gray-400">
													Students
												</p>

												<p className="mt-1 text-lg font-bold text-gray-800">
													{
														course.studentsEnrolled
															.length
													}
												</p>
											</div>

											<div>
												<p className="text-xs uppercase tracking-wider text-gray-400">
													Price
												</p>

												<p className="mt-1 text-lg font-bold text-pink-600">
													₹ {course.price}
												</p>
											</div>
										</div>
									</div>

									<div className="h-1 w-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full"></div>
								</div>
							))}
					</div>
				</div>
			</>
		) : (
			<div className="flex flex-col items-center justify-center rounded-3xl border bg-white py-24 shadow-xl">
				<div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100">
					<span className="text-5xl">📚</span>
				</div>

				<h2 className="mt-8 text-3xl font-bold text-gray-800">
					No Courses Yet
				</h2>

				<p className="mt-3 max-w-md text-center text-gray-500">
					Looks like you haven't created any courses yet.
					Start building your first course and inspire thousands
					of students around the world.
				</p>

				<Link
					to="/dashboard/add-course"
					className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
				>
					Create Your First Course
				</Link>
			</div>
		)}
	</div>
);
}
