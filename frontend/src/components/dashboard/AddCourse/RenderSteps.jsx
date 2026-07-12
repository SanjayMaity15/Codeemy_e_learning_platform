import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
	const { step } = useSelector((state) => state.course);

	const steps = [
		{ id: 1, title: "Course Information" },
		{ id: 2, title: "Course Builder" },
		{ id: 3, title: "Publish" },
	];

	return (
		<>
			{/* Stepper */}
			<div className="mb-12">
				<div className="flex items-center justify-between">
					{steps.map((item, index) => (
						<div key={item.id} className="flex flex-1 items-center">
							{/* Step */}
							<div className="flex flex-col items-center">
								<div
									className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300
									${
										step > item.id
											? "border-green-600 bg-green-600 text-white"
											: step === item.id
												? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-300"
												: "border-gray-300 bg-white text-gray-500"
									}`}
								>
									{step > item.id ? <FaCheck /> : item.id}
								</div>

								<p
									className={`mt-3 text-center text-sm font-medium transition-colors
									${step >= item.id ? "text-indigo-700" : "text-gray-500"}`}
								>
									{item.title}
								</p>
							</div>

							{/* Connector */}
							{index !== steps.length - 1 && (
								<div className="mx-4 flex-1">
									<div
										className={`h-1 rounded-full transition-all duration-500
										${step > item.id ? "bg-green-600" : "bg-gray-300"}`}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Forms */}
			{step === 1 && <CourseInformationForm />}
			{step === 2 && <CourseBuilderForm />}
			{step === 3 && <PublishCourse />}
		</>
	);
}
