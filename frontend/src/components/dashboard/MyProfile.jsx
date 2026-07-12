import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../common/IconBtn";

export default function MyProfile() {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	return (
		<>
			<h1 className="mb-8 text-2xl font-bold font-orbitron text-primary">
				My Profile
			</h1>

			{/* Profile Card */}
			<div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 md:p-8">
				<div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
					<img
						src={user?.image}
						alt={`profile-${user?.firstName}`}
						className="aspect-square w-20 rounded-full object-cover border-4 border-indigo-100 shadow"
					/>

					<div>
						<p className="text-2xl font-semibold text-primary">
							{user?.firstName + " " + user?.lastName}
						</p>

						<p className="text-gray-500 mt-1">{user?.email}</p>
					</div>
				</div>

				<div className="mt-5 md:mt-0">
					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>
			</div>

			{/* About */}
			<div className="my-8 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 md:p-8">
				<div className="flex items-center justify-between mb-5">
					<p className="text-xl font-semibold text-primary">About</p>

					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>

				<p className="text-gray-600 leading-7">
					{user?.additionalDetails?.about ??
						"Write Something About Yourself"}
				</p>
			</div>

			{/* Personal Details */}
			<div className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 md:p-8">
				<div className="flex items-center justify-between mb-8">
					<p className="text-xl font-semibold text-primary">
						Personal Details
					</p>

					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Left */}
					<div className="space-y-6">
						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								First Name
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800">
								{user?.firstName}
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								Email
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800 break-all">
								{user?.email}
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								Gender
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800">
								{user?.additionalDetails?.gender ??
									"Add Gender"}
							</p>
						</div>
					</div>

					{/* Right */}
					<div className="space-y-6">
						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								Last Name
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800">
								{user?.lastName}
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								Phone Number
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800">
								{user?.additionalDetails?.contactNumber ??
									"Add Contact Number"}
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
								Date Of Birth
							</p>

							<p className="mt-1 text-lg font-medium text-gray-800">
								{new Date(
									user?.additionalDetails?.dateOfBirth,
								).toDateString() ?? "Add Date Of Birth"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
