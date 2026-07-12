import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const navigate = useNavigate();

return (
	<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
		<div className="max-w-xl w-full rounded-3xl bg-white border border-gray-200 shadow-lg p-10 text-center">
			{/* 404 */}
			<h1 className="text-8xl md:text-9xl font-extrabold text-primary tracking-tight">
				404
			</h1>

			{/* Heading */}
			<h2 className="mt-6 text-3xl font-bold text-gray-900">
				Page Not Found
			</h2>

			{/* Description */}
			<p className="mt-4 text-gray-500 leading-7">
				Sorry, the page you're looking for doesn't exist, has been
				moved, or the URL is incorrect.
			</p>

			{/* Buttons */}
			<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
				>
					<FaArrowLeft />
					Go Back
				</button>

				<Link
					to="/"
					className="rounded-xl bg-primary px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
				>
					Go Home
				</Link>

				<Link
					to="/dashboard/my-profile"
					className="rounded-xl bg-pink-600 px-6 py-3 text-white font-medium hover:bg-pink-700 transition"
				>
					Dashboard
				</Link>
			</div>

			<div className="mt-10 border-t border-gray-200 pt-5">
				<p className="text-sm text-gray-400">Error Code • 404</p>
			</div>
		</div>
	</div>
);
};

export default ErrorPage;
