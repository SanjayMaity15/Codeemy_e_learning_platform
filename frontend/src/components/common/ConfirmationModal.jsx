import { useState } from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
	const [loading, setLoading] = useState(false);

	return (
		<div className="fixed inset-0 z-1000 grid place-items-center overflow-auto bg-black/50 backdrop-blur-sm">
			<div className="w-sm rounded-lg border border-richblack-400 bg-white p-6">
				<p className="text-2xl font-semibold text-richblack-5">
					{modalData?.text1}
				</p>

				<p className="mt-3 mb-5 leading-6 text-richblack-200">
					{modalData?.text2}
				</p>

				<div className="flex items-center gap-x-4">
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
								? modalData?.loadingText
									? modalData.loadingText
									: "Please wait..."
								: modalData?.btn1Text
						}
						disabled={loading}
						loading={loading}
					/>

					<button
						className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
						onClick={modalData?.btn2Handler}
					>
						{modalData?.btn2Text}
					</button>
				</div>
			</div>
		</div>
	);
}
