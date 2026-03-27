import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Course_Card from "../components/Catalog/Course_Card";
import Course_Slider from "../components/Catalog/Course_Slider";
import axios from "axios";
import Loader from "../components/common/Loader";

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
				console.log(category_id);
				setCategoryId(category_id);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			}
		})();
	}, [category]);

	console.log(categoryId);

	useEffect(() => {
		setCatalogPageData(null)
		if (categoryId) {
			(async () => {
				try {
					setLoading(true);
					const res = await axios.post(
						`${import.meta.env.VITE_SERVER_URL}course/getCategoryPageDetails`,
						{ categoryId },
						{ withCredentials: true },
					);
					console.log(res);
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
	if (catalogPageData?.length === 0) {
		return <div>No course found</div>;
	}

	return (
		<div className="section-container">
			{/* Hero Section */}
			<div className="">
				<div className="mx-auto flex py-8 flex-col justify-center gap-2">
					<p className="text-sm text-primary">
						{`Home / Catalog / `}
						<span className="font-bold">
							{catalogPageData?.data?.selectedCategory?.name}
						</span>
					</p>
					<p className="text-3xl text-pink-600">
						{catalogPageData?.data?.selectedCategory?.name}
					</p>
					<p className="max-w-217.5 text-gray-500">
						{catalogPageData?.data?.selectedCategory?.description}
					</p>
				</div>
			</div>

			{/* Section 1 */}
			<div className="w-full mt-6">
				<div className="text-2xl">Courses to get you started</div>
				<div className="my-4 flex text-sm">
					<p
						className={`px-4 py-2 ${
							active === 1
								? "border-b border-b-yellow-25 text-yellow-25"
								: "text-richblack-50"
						} cursor-pointer`}
						onClick={() => setActive(1)}
					>
						Most Populer
					</p>
					<p
						className={`px-4 py-2 ${
							active === 2
								? "border-b border-b-yellow-25 text-yellow-25"
								: "text-richblack-50"
						} cursor-pointer`}
						onClick={() => setActive(2)}
					>
						New
					</p>
				</div>
				<div className="">
					<Course_Slider Courses={filteredCourses} id={"slider1"} />
				</div>
			</div>
			{/* Section 2 */}
			<div className="w-full px-4 py-12">
				<div className="section_heading text-2xl">
					Top courses in{" "}
					{catalogPageData?.data?.differentCategory?.name}
				</div>
				<div className="py-8">
					<Course_Slider
						Courses={
							catalogPageData?.data?.differentCategory?.courses
						}
						id={"slider2"}
					/>
				</div>
			</div>

			{/* Section 3 */}
			<div className="w-full px-4 py-12">
				<div className="section_heading text-2xl">
					Frequently Bought
				</div>
				<div className="py-8">
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{catalogPageData?.data?.mostSellingCourses
							?.slice(0, 3)
							.map((course, i) => (
								<Course_Card
									course={course}
									key={i}
									Height={"h-[200px]"}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryPage;
