import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Course_Card from "../components/Catalog/Course_Card";
import Course_Slider from "../components/Catalog/Course_Slider";
import axios from "axios";
import Loader from "../components/common/Loader";
import PageTitle from "../components/common/HelmetForTitle";
import cartoonImage from "../assets/cartoon.png"

function CategoryPage() {
	const { category } = useParams();
	const [active, setActive] = useState(1);
	const [catalogPageData, setCatalogPageData] = useState(null);
	const [categoryId, setCategoryId] = useState("");
	const [loading, setLoading] = useState(false);
	// Fetch All Categories
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}course/showAllCategories`,
				);
				const category_id = res?.data?.data?.filter(
					(ct) =>
						ct.name.split(" ").join("-").toLowerCase() === category,
				)[0]._id;
				
				setCategoryId(category_id);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			}
		})();
	}, [category]);

	useEffect(() => {
		setCatalogPageData(null);
		if (categoryId) {
			(async () => {
				try {
					setLoading(true);
					const res = await axios.post(
						`${import.meta.env.VITE_SERVER_URL}course/getCategoryPageDetails`,
						{ categoryId },
						{ withCredentials: true },
					);
					
					setCatalogPageData(res.data);
					setLoading(false);
				} catch (error) {
					console.log(error);
					setLoading(false);
				}
			})();
		}
	}, [categoryId]);

	

	const courses = catalogPageData?.data?.selectedCategory?.courses || [];

	let filteredCourses = [];

	if (active === 1) {
		// Most Popular
		filteredCourses = [...courses].sort(
			(a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length,
		);
	} else {
		// New
		filteredCourses = [...courses].sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
		);
	}

	if (loading) {
		return <Loader />;
	}

if (!courses || courses.length === 0) {
	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
			<img src={cartoonImage} alt="No Courses" className="w-60" />

			<h1 className="mt-8 text-4xl font-bold text-gray-800">
				No Courses Found
			</h1>

			<p className="mt-3 max-w-md text-gray-500">
				Sorry, we couldn't find any courses in this category. Try
				browsing another category.
			</p>

			<button
				onClick={() => window.history.back()}
				className="mt-8 rounded-full bg-primary px-8 py-3 text-white hover:bg-indigo-700 transition"
			>
				Browse Categories
			</button>
		</div>
	);
}

return (
	<div className="bg-gray-50 min-h-screen">
		<PageTitle title={`Courses | ${category}`} />

		{/* Hero */}
		<section className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
				<p className="text-sm text-gray-500">
					Home / Catalog /
					<span className="font-medium text-primary">
						{" "}
						{catalogPageData?.data?.selectedCategory?.name}
					</span>
				</p>

				<h1 className="mt-3 text-4xl font-bold text-gray-900">
					{catalogPageData?.data?.selectedCategory?.name}
				</h1>

				<p className="mt-4 max-w-3xl text-gray-600 leading-7">
					{catalogPageData?.data?.selectedCategory?.description}
				</p>
			</div>
		</section>

		<div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
			{/* Courses */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<h2 className="text-2xl font-bold text-gray-900">
						Courses to get you started
					</h2>

					<div className="flex rounded-xl bg-gray-100 p-1 w-fit">
						<button
							onClick={() => setActive(1)}
							className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
								active === 1
									? "bg-primary text-white shadow"
									: "text-gray-600 hover:bg-white"
							}`}
						>
							Most Popular
						</button>

						<button
							onClick={() => setActive(2)}
							className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
								active === 2
									? "bg-primary text-white shadow"
									: "text-gray-600 hover:bg-white"
							}`}
						>
							New
						</button>
					</div>
				</div>

				<div className="mt-8">
					<Course_Slider Courses={filteredCourses} id="slider1" />
				</div>
			</div>

			{/* Top Courses */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-10">
				<h2 className="text-2xl font-bold text-gray-900">
					Top Courses in{" "}
					<span className="text-primary">
						{catalogPageData?.data?.differentCategory?.name}
					</span>
				</h2>

				<div className="mt-8">
					<Course_Slider
						Courses={
							catalogPageData?.data?.differentCategory?.courses
						}
						id="slider2"
					/>
				</div>
			</div>

			{/* Frequently Bought */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-10">
				<h2 className="text-2xl font-bold text-gray-900">
					Frequently Bought Together
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
					{catalogPageData?.data?.mostSellingCourses
						?.slice(0, 3)
						.map((course) => (
							<Course_Card
								key={course._id}
								course={course}
								Height="h-[220px]"
							/>
						))}
				</div>
			</div>
		</div>
	</div>
);
}

export default CategoryPage;
