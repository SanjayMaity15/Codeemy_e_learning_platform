import { FaBookOpen, FaLightbulb } from "react-icons/fa";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
	return (
		<div className="flex flex-col xl:flex-row gap-8">
			{/* Left Section */}
			<div className="flex-1">
				{/* Header */}
				<div className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
					<h1 className="text-3xl font-bold">
						Create a New Course 🚀
					</h1>

					<p className="mt-3 max-w-2xl text-indigo-100">
						Build an engaging learning experience by adding course
						details, organizing lectures, and publishing your
						content for students.
					</p>
				</div>

				{/* Steps */}
				<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
					<RenderSteps />
				</div>
			</div>

			{/* Right Sidebar */}
			<div className="hidden xl:block w-90">
				<div className="sticky top-8 space-y-6">
					{/* Tips Card */}
					<div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-indigo-100 p-3">
								<FaLightbulb className="text-xl text-indigo-600" />
							</div>

							<div>
								<h2 className="text-lg font-bold text-gray-800">
									Course Upload Tips
								</h2>

								<p className="text-sm text-gray-500">
									Best practices for a professional course.
								</p>
							</div>
						</div>

						<ul className="mt-6 space-y-4 text-sm text-gray-600">
							<li>✅ Set a course price or make it free.</li>

							<li>
								✅ Use a thumbnail of
								<strong> 1024 × 576 px</strong>.
							</li>

							<li>
								✅ Upload a high-quality course introduction
								video.
							</li>

							<li>
								✅ Organize your course into sections and
								lectures.
							</li>

							<li>✅ Add quizzes after important sections.</li>

							<li>
								✅ Include clear requirements and learning
								outcomes.
							</li>

							<li>
								✅ Publish only after reviewing every lecture.
							</li>

							<li>
								✅ Keep lessons short (5–15 minutes) for better
								engagement.
							</li>
						</ul>
					</div>

					{/* Progress Card */}
					<div className="rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-white/20 p-3">
								<FaBookOpen className="text-xl" />
							</div>

							<div>
								<h3 className="font-semibold">
									Course Creation
								</h3>

								<p className="text-sm text-green-100">
									Complete all three steps to publish your
									course.
								</p>
							</div>
						</div>

						<div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
							<div className="h-full w-1/3 rounded-full bg-white"></div>
						</div>

						<p className="mt-2 text-xs text-green-100">
							Progress updates automatically as you complete each
							step.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
