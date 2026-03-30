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
	const [actionType, setActionType] = useState("")

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
			console.log(res.data.data);
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
			setActionType("approve")
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/approved`,
				{ insId },
				{ withCredentials: true },
			);
			fetchInstructors();
			toast.success(res.data.message);
			setLoadingId(null);
			setActionType("")
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(err);
			setLoadingId(null);
			setActionType("")
		}
	};
	// Approve instructor
	const deactivateInstructor = async (insId) => {
		try {
			setLoadingId(insId);
			setActionType("deactivate")
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}admin/deactivate`,
				{ insId },
				{ withCredentials: true },
			);
			fetchInstructors();
			toast.success(res.data.message);
			setLoadingId(null);
			setActionType("")
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(err);
			setLoadingId(null);
			setActionType("")
		}
	};

	// Delete student
	const deleteStudent = async (stuId) => {
		try {
			setLoadingId(stuId);
			setActionType("delete")
			const res = await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}admin/delete-student/${stuId}`,
				{ withCredentials: true },
			);

			fetchStudents();
			toast.success(res.data.message);
			setLoadingId(null);
			setActionType("")
		} catch (err) {
			toast.error(err.response.data.message);
			setLoadingId(null);
			setActionType("")
			console.log(err);
		}
	};

	console.log({ students, instructors, payments });
	return (
		<div className="px-6 bg-linear-to-b from-gray-100 to-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold mb-2 text-indigo-700">
				Admin Dashboard
			</h1>
			<p className="mb-4 text-gray-600">{`${user?.firstName} ${user?.lastName}`}</p>

			{/* Instructor Table */}
			<h3 className="mt-4 mb-1 font-semibold text-indigo-700 uppercase">
				Instructor List
			</h3>
			<table className="border text-center w-full bg-white rounded-lg shadow-md">
				<thead className="bg-indigo-100 text-indigo-800">
					<tr>
						<th className="border p-2">SI NO</th>
						<th className="border p-2">NAME</th>
						<th className="border p-2">EMAIL</th>
						<th className="border p-2">STATUS</th>
						<th className="border p-2">COURSE COUNT</th>
						<th className="border p-2">JOIN</th>
						<th className="border p-2">APPROVED</th>
					</tr>
				</thead>
				<tbody>
					{instructors?.map((ins, i) => (
						<tr
							key={ins._id}
							className={
								i % 2 === 0 ? "bg-indigo-50" : "bg-white"
							}
						>
							<td className="border p-2">{i + 1}</td>
							<td className="border p-2">{`${ins.firstName} ${ins.lastName}`}</td>
							<td className="border p-2">{ins.email}</td>
							<td className="border p-2 text-sm">
								{ins.approved ? (
									<span className="bg-green-100 text-green-600 px-2 border rounded-full flex items-center gap-1">
										<MdOutlineVerified /> Verified
									</span>
								) : (
									<span className="bg-red-100 text-red-600 px-2 border rounded-full flex items-center gap-1">
										<FaBan /> Not Verified
									</span>
								)}
							</td>
							<td className="border p-2">
								{ins.courses?.length}
							</td>
							<td className="border p-2">
								{new Date(ins.createdAt).toLocaleDateString()}
							</td>
							<td className="border p-2 text-sm">
								{!ins.approved ? (
									<button
										className="text-green-600 bg-green-100 px-2 cursor-pointer border rounded-full hover:bg-green-200 transition"
										onClick={() =>
											approveInstructor(ins._id)
										}
									>
										{loadingId === ins._id && actionType === "approve" ? (
											<ButtonLoader text="Approving" />
										) : (
											<span>Approve</span>
										)}
									</button>
								) : (
									<button
										className="text-red-600 bg-red-100 px-2 cursor-pointer border rounded-full hover:bg-red-200 transition"
										onClick={() =>
											deactivateInstructor(ins._id)
										}
									>
										{loadingId === ins._id && actionType === "deactivate" ? (
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

			{/* Student Table */}
			<h3 className="mt-4 mb-1 font-semibold text-pink-600 uppercase">
				Student List
			</h3>
			<table className="border text-center w-full bg-white rounded-lg shadow-md">
				<thead className="bg-pink-100 text-pink-800">
					<tr>
						<th className="border p-2">SI NO</th>
						<th className="border p-2">NAME</th>
						<th className="border p-2">EMAIL</th>
						<th className="border p-2">STATUS</th>
						<th className="border p-2">COURSE BOUGHT</th>
						<th className="border p-2">JOIN</th>
						<th className="border p-2">DELETE</th>
					</tr>
				</thead>
				<tbody>
					{students?.map((stu, i) => (
						<tr
							key={stu._id}
							className={i % 2 === 0 ? "bg-red-50" : "bg-white"}
						>
							<td className="border p-2">{i + 1}</td>
							<td className="border p-2">{`${stu.firstName} ${stu.lastName}`}</td>
							<td className="border p-2">{stu.email}</td>
							<td className="border p-2 text-sm">
								{stu.approved ? (
									<span className="bg-green-100 text-green-600 px-2 border rounded-full flex items-center gap-1">
										<MdOutlineVerified /> Verified
									</span>
								) : (
									<span className="bg-red-100 text-red-600 px-2 border rounded-full flex items-center gap-1">
										<FaBan /> Not Verified
									</span>
								)}
							</td>
							<td className="border p-2">
								{stu.courses?.length}
							</td>
							<td className="border p-2">
								{new Date(stu.createdAt).toLocaleDateString()}
							</td>
							<td className="border p-2 text-sm">
								<button
									className="text-red-600 bg-red-100 px-2 cursor-pointer border rounded-full hover:bg-red-200 transition"
									onClick={() => deleteStudent(stu._id)}
								>
									{loadingId === stu._id && actionType === "delete" ? (
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
	);
};

export default AdminDashboard;
