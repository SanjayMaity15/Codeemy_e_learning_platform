import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import { BuyCourse } from "../../../apis/studentFeaturesAPI";

export default function RenderTotalAmount() {
	const { total, cart } = useSelector((state) => state.cart);
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleBuyCourse = () => {
		const courses = cart.map((course) => course._id);
		BuyCourse(token, courses, user, navigate, dispatch);
	};

	return (
		<div className="min-w-85 rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-xl p-7 shadow-xl sticky top-28">
			<p className="mb-2 text-lg font-medium text-gray-500 uppercase tracking-wider">
				Order Summary
			</p>

			<div className="mb-6 border-b border-gray-200 pb-6">
				<p className="text-sm text-gray-500">Total Amount</p>

				<p className="mt-2 text-4xl font-bold bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
					₹ {total}
				</p>
			</div>

			<div className="mb-6 space-y-3 text-sm text-gray-500">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-green-500"></span>
					Lifetime Access
				</div>

				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-indigo-500"></span>
					Certificate Included
				</div>

				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-pink-500"></span>
					Free Future Updates
				</div>
			</div>

			<IconBtn
				text="Buy Now"
				onclick={handleBuyCourse}
				customClasses="w-full justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
			/>
		</div>
	);
}
