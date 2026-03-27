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
		<div className="flex justify-center bg-gray-100">
			<form
				className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
				onSubmit={handleCreateCategory}
			>
				<h3 className="text-2xl font-semibold text-center uppercase text-primary">
					Create Catagory
				</h3>

				<div className="flex flex-col">
					<label
						htmlFor="name"
						className="mb-2 font-medium text-gray-700"
					>
						Category Name
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter category name"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="desc"
						className="mb-2 font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						type="text"
						id="desc"
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter description"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-medium py-3 rounded-full hover:bg-blue-700 transition duration-200 flex justify-center items-center"
					disabled={loading}
				>
					{loading ? (
						<ButtonLoader />
					) : (
						<span className="flex items-center gap-1 tracking-wider">
							<IoMdAdd />
							Create
						</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default AdminCategory;
