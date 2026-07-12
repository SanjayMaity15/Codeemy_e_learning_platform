import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
	const { total, totalItems } = useSelector((state) => state.cart);

	return (
		<div className="min-h-screen">
			{/* Header */}
			<div className="mb-10">
				<div className="flex items-center gap-4">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-pink-500 text-white shadow-lg">
						<FaShoppingCart className="text-2xl" />
					</div>

					<div>
						<h1 className="text-4xl font-bold font-orbitron bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
							Shopping Cart
						</h1>

						<p className="mt-2 text-gray-500">
							Review your selected courses before checkout.
						</p>
					</div>
				</div>
			</div>

			{/* Course Count */}
			<div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
				<p className="text-lg font-semibold text-gray-700">
					<span className="text-primary text-2xl">{totalItems}</span>{" "}
					{totalItems === 1 ? "Course" : "Courses"} in your cart
				</p>
			</div>

			{/* Content */}
			{total > 0 ? (
				<div className="flex flex-col gap-8 lg:flex-row">
					{/* Left Side */}
					<div className="flex-1 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
						<RenderCartCourses />
					</div>

					{/* Right Side */}
					<div className="lg:w-95">
						<RenderTotalAmount />
					</div>
				</div>
			) : (
				<div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 shadow-sm">
					<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-pink-100">
						<FaShoppingCart className="text-5xl text-primary" />
					</div>

					<h2 className="text-3xl font-bold text-gray-800">
						Your Cart is Empty
					</h2>

					<p className="mt-3 max-w-md text-center text-gray-500">
						Looks like you haven't added any courses yet. Start
						exploring our premium courses and build your future with
						Codeemy.
					</p>

				</div>
			)}
		</div>
	);
}
