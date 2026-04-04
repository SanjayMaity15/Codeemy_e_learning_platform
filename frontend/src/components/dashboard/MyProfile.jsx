import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../common/IconBtn";

export default function MyProfile() {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();

	return (
		<>
			<h1 className="mb-4 md:text-2xl text-xl font-semibold">
				My Profile
			</h1>
			<div className="flex items-center justify-between rounded-sm shadow-sm bg-white md:p-8 p-4 md:px-12">
				<div className="flex flex-col item-start md:flex-row md:items-center gap-x-4">
					<img
						src={user?.image}
						alt={`profile-${user?.firstName}`}
						className="aspect-square md:w-19.5 w-12 rounded-full object-cover"
					/>
					<div className="space-y-1">
						<p className="text-lg font-semibold text-black-5">
							{user?.firstName + " " + user?.lastName}
						</p>
						<p className="text-sm text-gray-500">{user?.email}</p>
					</div>
				</div>
				<IconBtn
					text="Edit"
					onclick={() => {
						navigate("/dashboard/settings");
					}}
				>
					<RiEditBoxLine />
				</IconBtn>
			</div>

			<div className="my-10 flex flex-col gap-y-5 rounded-md bg-white  shadow-sm p-8 px-12">
				<div className="flex w-full items-center justify-between">
					<p className="text-lg font-semibold">About</p>
					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>
				<p className="">
					{user?.additionalDetails?.about ??
						"Write Something About Yourself"}
				</p>
			</div>

			<div className="my-10 flex flex-col gap-y-10 rounded-sm shadow-sm bg-white p-8 md:px-12 px-4">
				<div className="flex w-full items-center justify-between">
					<p className="text-lg font-semibold">Personal Details</p>
					<IconBtn
						text="Edit"
						onclick={() => {
							navigate("/dashboard/settings");
						}}
					>
						<RiEditBoxLine />
					</IconBtn>
				</div>
				<div className="flex flex-col md:flex-row max-w-125 justify-between">
					<div className="flex flex-col gap-y-5">
						<div>
							<p className="mb-2 text-sm font-semibold">
								First Name
							</p>
							<p className="text-sm font-medium">
								{user?.firstName}
							</p>
						</div>
						<div>
							<p className="mb-2 text-sm font-semibold">Email</p>
							<p className="text-sm font-medium">{user?.email}</p>
						</div>
						<div>
							<p className="mb-2 text-sm font-semibold">Gender</p>
							<p className="text-sm font-medium">
								{user?.additionalDetails?.gender ??
									"Add Gender"}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-y-5">
						<div>
							<p className="mb-2 text-sm font-semibold">
								Last Name
							</p>
							<p className="text-sm font-medium">
								{user?.lastName}
							</p>
						</div>
						<div>
							<p className="mb-2 text-sm font-semibold">
								Phone Number
							</p>
							<p className="text-sm font-medium">
								{user?.additionalDetails?.contactNumber ??
									"Add Contact Number"}
							</p>
						</div>
						<div>
							<p className="mb-2 text-sm font-semibold">
								Date Of Birth
							</p>
							<p className="text-sm font-medium">
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
