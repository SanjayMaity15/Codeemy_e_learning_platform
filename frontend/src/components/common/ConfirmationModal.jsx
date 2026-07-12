import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
	const [loading, setLoading] = useState(false);

	return (
		<div
			className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
			onClick={modalData?.btn2Handler}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]"
			>
				{/* Header */}
				<div className="bg-linear-to-r from-red-500 via-pink-500 to-orange-500 px-8 py-7 text-center">
					<div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-lg">
						<FiAlertTriangle className="text-4xl text-red-500" />
					</div>

					<h2 className="mt-4 text-2xl font-bold text-white">
						Confirmation Required
					</h2>
				</div>

				{/* Body */}
				<div className="px-8 py-7">
					<h3 className="text-xl font-semibold text-gray-800">
						{modalData?.text1}
					</h3>

					<p className="mt-3 leading-7 text-gray-500">
						{modalData?.text2}
					</p>

					{/* Buttons */}
					<div className="mt-8 flex justify-end gap-4">
						<button
							onClick={modalData?.btn2Handler}
							className="rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
						>
							{modalData?.btn2Text || "Cancel"}
						</button>

						<IconBtn
							onclick={async () => {
								try {
									setLoading(true);
									await modalData?.btn1Handler();
								} catch (error) {
									console.error(error);
								} finally {
									setLoading(false);
								}
							}}
							text={
								loading
									? modalData?.loadingText || "Please wait..."
									: modalData?.btn1Text || "Confirm"
							}
							disabled={loading}
							loading={loading}
							customClasses="rounded-xl px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
