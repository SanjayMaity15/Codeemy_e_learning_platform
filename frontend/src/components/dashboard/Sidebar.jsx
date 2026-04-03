import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../data/dashboard-links";

import SidebarLink from "./SidebarLink";
import Logout from "../auth/Logout";

export default function Sidebar() {
	const { user, loading: profileLoading } = useSelector(
		(state) => state.profile,
	);
	const { loading: authLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openLogoutPopup, setOpenLogoutPopup] = useState(false);


	if (profileLoading || authLoading) {
		return (
			<div className="grid h-[calc(100vh-3.5rem)] min-w-55 items-center border-r- border-r-richblack-700 bg-richblack-800">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<>
			<div className="hidden sm:flex min-w-55 bg-white flex-col border-r border-r-pink-200 shadow-md py-10">
				<div className="flex flex-col">
					{sidebarLinks.map((link) => {
						if (link.type && user?.accountType !== link.type)
							return null;
						return (
							<SidebarLink
								key={link.id}
								link={link}
								iconName={link.icon}
							/>
						);
					})}
				</div>
				<div className="mx-auto mt-6 mb-6 h-px w-10/12 bg-richblack-700" />
				<div className="flex flex-col">
					<SidebarLink
						link={{ name: "Settings", path: "/dashboard/settings" }}
						iconName="VscSettingsGear"
					/>
					<button
						className="px-8 py-2 text-sm font-medium hover:bg-pink-100 cursor-pointer"
						onClick={() => setOpenLogoutPopup(true)}
					>
						<div className="flex items-center gap-x-2 text-red-600">
							<VscSignOut className="text-lg" />
							<span>Logout</span>
						</div>
					</button>
				</div>
			</div>

			{openLogoutPopup && (
				<Logout onClose={() => setOpenLogoutPopup(false)} />
			)}
		</>
	);
}
