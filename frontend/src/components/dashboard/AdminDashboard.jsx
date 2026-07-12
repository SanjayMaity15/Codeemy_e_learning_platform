import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

import {
	setInstructors,
	setPayments,
	setStudents,
} from "../../feature/adminSlice";
import toast from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

const AdminDashboard = () => {
	const [loadingId, setLoadingId] = useState(null);
	const [actionType, setActionType] = useState("");

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.profile);
	const { students, instructors, payments } = useSelector(
		(state) => state.admin,
	);

	// Fetch data
	const fetchInstructors = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/instructor`,
				{ withCredentials: true },
			);

			dispatch(setInstructors(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchStudents = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/student`,
				{ withCredentials: true },
			);

			dispatch(setStudents(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchPayments = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}admin/payment`,
				{ withCredentials: true },
			);

			dispatch(setPayments(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchInstructors();
		fetchStudents();
		fetchPayments();
	}, []);

	// Approve instructor
	const approveInstructor = async (insId) => {
		try {
			setLoadingId(insId);
			setActionType("approve");

			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/approved`,
				{ insId },
				{ withCredentials: true },
			);

			fetchInstructors();
			toast.success(res.data.message);

			setLoadingId(null);
			setActionType("");
		} catch (error) {
			toast.error(error.response.data.message);

			setLoadingId(null);
			setActionType("");
		}
	};

	// Deactivate instructor
	const deactivateInstructor = async (insId) => {
		try {
			setLoadingId(insId);
			setActionType("deactivate");

			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/deactivate`,
				{ insId },
				{ withCredentials: true },
			);

			fetchInstructors();
			toast.success(res.data.message);

			setLoadingId(null);
			setActionType("");
		} catch (error) {
			toast.error(error.response.data.message);

			setLoadingId(null);
			setActionType("");
		}
	};

	// Delete student
	const deleteStudent = async (stuId) => {
		try {
			setLoadingId(stuId);
			setActionType("delete");

			const res = await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}admin/delete-student/${stuId}`,
				{ withCredentials: true },
			);

			fetchStudents();
			toast.success(res.data.message);

			setLoadingId(null);
			setActionType("");
		} catch (err) {
			toast.error(err.response.data.message);

			setLoadingId(null);
			setActionType("");

			console.log(err);
		}
	};

	return (
		<div className="min-h-screen space-y-10 rounded-3xl bg-linear-to-br from-slate-50 via-white to-pink-50 p-6 md:p-8">
			{/* Header */}
			<div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
				<h1 className="text-4xl font-bold text-primary">
					Admin Dashboard
				</h1>

				<p className="mt-2 text-gray-500">
					Welcome back,
					<span className="ml-2 font-semibold text-pink-600">
						{`${user?.firstName} ${user?.lastName}`}
					</span>
				</p>
			</div>{" "}
			{/* Instructor Table */}
			<div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
				<div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
					<h3 className="text-xl font-bold text-primary">
						Instructor List
					</h3>

					<div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
						Total: {instructors?.length}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-linear-to-r from-indigo-50 to-indigo-100">
							<tr className="text-sm font-bold uppercase tracking-wider text-indigo-700">
								<th className="px-6 py-4 text-left">SI NO</th>
								<th className="px-6 py-4 text-left">NAME</th>
								<th className="px-6 py-4 text-left">EMAIL</th>
								<th className="px-6 py-4 text-center">
									STATUS
								</th>
								<th className="px-6 py-4 text-center">
									COURSES
								</th>
								<th className="px-6 py-4 text-center">JOIN</th>
								<th className="px-6 py-4 text-center">
									ACTION
								</th>
							</tr>
						</thead>

						<tbody>
							{instructors?.map((ins, i) => (
								<tr
									key={ins._id}
									className="border-t border-gray-100 transition hover:bg-gray-50"
								>
									<td className="px-6 py-5 font-semibold text-gray-700">
										{i + 1}
									</td>

									<td className="px-6 py-5 font-semibold text-primary">
										{`${ins.firstName} ${ins.lastName}`}
									</td>

									<td className="px-6 py-5 text-gray-600">
										{ins.email}
									</td>

									<td className="px-6 py-5">
										<div className="flex justify-center">
											{ins.approved ? (
												<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
													<MdOutlineVerified />
													Verified
												</span>
											) : (
												<span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600">
													<FaBan />
													Not Verified
												</span>
											)}
										</div>
									</td>

									<td className="px-6 py-5 text-center font-semibold text-gray-700">
										{ins.courses?.length}
									</td>

									<td className="px-6 py-5 text-center text-gray-600">
										{new Date(
											ins.createdAt,
										).toLocaleDateString()}
									</td>

									<td className="px-6 py-5 text-center">
										{!ins.approved ? (
											<button
												className="rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-200 cursor-pointer"
												onClick={() =>
													approveInstructor(ins._id)
												}
											>
												{loadingId === ins._id &&
												actionType === "approve" ? (
													<ButtonLoader text="Approving" />
												) : (
													<span>Approve</span>
												)}
											</button>
										) : (
											<button
												className="rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-200 cursor-pointer"
												onClick={() =>
													deactivateInstructor(
														ins._id,
													)
												}
											>
												{loadingId === ins._id &&
												actionType === "deactivate" ? (
													<ButtonLoader text="Deactivating" />
												) : (
													<span>Deactivate</span>
												)}
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>{" "}
			{/* Student Table */}
			<div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100">
				<div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
					<h3 className="text-xl font-bold text-pink-600">
						Student List
					</h3>

					<div className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
						Total: {students?.length}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-linear-to-r from-pink-50 to-pink-100">
							<tr className="text-sm font-bold uppercase tracking-wider text-pink-700">
								<th className="px-6 py-4 text-left">SI NO</th>
								<th className="px-6 py-4 text-left">NAME</th>
								<th className="px-6 py-4 text-left">EMAIL</th>
								<th className="px-6 py-4 text-center">
									STATUS
								</th>
								<th className="px-6 py-4 text-center">
									COURSES
								</th>
								<th className="px-6 py-4 text-center">JOIN</th>
								<th className="px-6 py-4 text-center">
									ACTION
								</th>
							</tr>
						</thead>

						<tbody>
							{students?.map((stu, i) => (
								<tr
									key={stu._id}
									className="border-t border-gray-100 transition hover:bg-gray-50"
								>
									<td className="px-6 py-5 font-semibold text-gray-700">
										{i + 1}
									</td>

									<td className="px-6 py-5 font-semibold text-primary">
										{`${stu.firstName} ${stu.lastName}`}
									</td>

									<td className="px-6 py-5 text-gray-600">
										{stu.email}
									</td>

									<td className="px-6 py-5">
										<div className="flex justify-center">
											{stu.approved ? (
												<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
													<MdOutlineVerified />
													Verified
												</span>
											) : (
												<span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600">
													<FaBan />
													Not Verified
												</span>
											)}
										</div>
									</td>

									<td className="px-6 py-5 text-center font-semibold text-gray-700">
										{stu.courses?.length}
									</td>

									<td className="px-6 py-5 text-center text-gray-600">
										{new Date(
											stu.createdAt,
										).toLocaleDateString()}
									</td>

									<td className="px-6 py-5 text-center">
										<button
											className="rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-200 cursor-pointer"
											onClick={() =>
												deleteStudent(stu._id)
											}
										>
											{loadingId === stu._id &&
											actionType === "delete" ? (
												<ButtonLoader text="Deleting" />
											) : (
												<span>Delete</span>
											)}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;