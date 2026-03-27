import React from "react";
import { useSelector } from "react-redux";
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
import { Bar, Line } from "react-chartjs-2";

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

const Chart = () => {
	const { students, instructors, payments } = useSelector(
		(state) => state.admin,
	);

	console.log({ students, instructors, payments });
	// ===== Charts =====
	const instructorCourseData = {
		labels: instructors?.map((i) => `${i.firstName} ${i.lastName}`),
		datasets: [
			{
				label: "Courses",
				data: instructors?.map((i) => i.courses?.length || 0),
				backgroundColor: "rgba(79,70,229,0.8)",
			},
		],
	};

	const studentCourseData = {
		labels: students?.map((s) => `${s.firstName} ${s.lastName}`),
		datasets: [
			{
				label: "Courses Bought",
				data: students?.map((s) => s.courses?.length || 0),
				backgroundColor: "rgba(239,68,68,0.8)",
			},
		],
	};

	const revenueMap = {};
	payments?.forEach((p) => {
		const month = new Date(p.createdAt).toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
		revenueMap[month] = (revenueMap[month] || 0) + p.amount;
	});
	const monthlyRevenueData = {
		labels: Object.keys(revenueMap),
		datasets: [
			{
				label: "Revenue",
				data: Object.values(revenueMap),
				backgroundColor: "rgba(34,197,94,0.8)",
			},
		],
	};

	const signupMap = {};
	students?.forEach((s) => {
		const month = new Date(s.createdAt).toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
		signupMap[month] = (signupMap[month] || 0) + 1;
	});
	const monthlySignupData = {
		labels: Object.keys(signupMap),
		datasets: [
			{
				label: "New Students",
				data: Object.values(signupMap),
				borderColor: "rgba(79,70,229,0.9)",
				backgroundColor: "rgba(79,70,229,0.2)",
				tension: 0.4,
			},
		],
	};

	return (
        <div>
            <h3 className="text-3xl text-center font-semibold mb-8 text-orange-500">Analytics Report</h3>
			{/* Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:gap-16 mb-6">
				<div className="p-4 bg-white rounded-xl shadow-md">
					<h3 className="font-semibold mb-2 text-indigo-600">
						Instructor Course Count
					</h3>
					<Bar
						data={instructorCourseData}
						options={{ responsive: true }}
					/>
				</div>
				<div className="p-4 bg-white rounded-xl shadow-md">
					<h3 className="font-semibold mb-2 text-pink-600">
						Student Course Count
					</h3>
					<Bar
						data={studentCourseData}
						options={{ responsive: true }}
					/>
				</div>
				<div className="p-4 bg-white rounded-xl shadow-md">
					<h3 className="font-semibold mb-2 text-green-600">
						Monthly Revenue
					</h3>
					<Bar
						data={monthlyRevenueData}
						options={{ responsive: true }}
					/>
				</div>
				<div className="p-4 bg-white rounded-xl shadow-md">
					<h3 className="font-semibold mb-2 text-indigo-600">
						Monthly Student Signups
					</h3>
					<Line
						data={monthlySignupData}
						options={{ responsive: true }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chart;
