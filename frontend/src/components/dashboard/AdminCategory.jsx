import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../common/ButtonLoader";
import { IoMdAdd } from "react-icons/io";

const AdminCategory = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	async function handleCreateCategory(e) {
		e.preventDefault();
		if (!name || !description) return;

		setLoading(true);
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}course/createCategory`,
				{ name, description },
				{ withCredentials: true },
			);
			toast.success(res.data.message);
			setName("");
			setDescription("");
		} catch (error) {
			toast.error(error.response?.data?.error || "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen rounded-3xl bg-linear-to-br from-slate-50 via-white to-pink-50 p-6 md:p-8 flex items-center justify-center">
			<form
				className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-8 md:p-10 shadow-xl"
				onSubmit={handleCreateCategory}
			>
				{/* Header */}
				<div className="mb-8 text-center">
					<h3 className="text-3xl font-bold text-primary">
						Create Category
					</h3>

					<p className="mt-2 text-gray-500">
						Add a new course category for instructors.
					</p>
				</div>

				{/* Category Name */}
				<div className="mb-6 flex flex-col">
					<label
						htmlFor="name"
						className="mb-2 text-sm font-semibold text-gray-700"
					>
						Category Name
					</label>

					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-pink-100"
						placeholder="Enter category name"
					/>
				</div>

				{/* Description */}
				<div className="mb-8 flex flex-col">
					<label
						htmlFor="desc"
						className="mb-2 text-sm font-semibold text-gray-700"
					>
						Description
					</label>

					<textarea
						type="text"
						id="desc"
						rows={5}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-pink-100"
						placeholder="Enter category description"
					/>
				</div>

				{/* Button */}
				<button
					type="submit"
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
					disabled={loading}
				>
					{loading ? (
						<ButtonLoader />
					) : (
						<span className="flex items-center gap-2 tracking-wide">
							<IoMdAdd className="text-xl" />
							Create Category
						</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default AdminCategory;
