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
			<div className="grid h-[calc(100vh-3.5rem)] min-w-60 place-items-center border-r border-pink-100 bg-linear-to-b from-white to-pink-50">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<>
			<div className="flex h-screen w-52 sm:w-56 md:w-64 flex-col justify-between border-r border-pink-100 bg-white shadow-xl">
				{/* Logo/Header Space */}
				<div >
					<div className="border-b border-pink-100 px-6 py-6">
						<h2 className="text-xl font-bold text-primary">
							Dashboard
						</h2>

						<p className="mt-1 text-xs text-gray-500">
							Welcome back
						</p>
					</div>

					{/* Navigation */}
					<div className="mt-4 flex flex-col gap-1 px-3">
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
				</div>

				{/* Bottom */}
				<div className="border-t border-pink-100 p-3">
					<div className="mb-2">
						<SidebarLink
							link={{
								name: "Settings",
								path: "/dashboard/settings",
							}}
							iconName="VscSettingsGear"
						/>
					</div>

					<button
						className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-11 py-3 text-sm font-medium text-red-600 transition-all duration-300  hover:bg-red-50 hover:shadow-sm"
						onClick={() => setOpenLogoutPopup(true)}
					>
						<VscSignOut className="text-xl" />

						<span>Logout</span>
					</button>
				</div>
			</div>

			{openLogoutPopup && (
				<Logout onClose={() => setOpenLogoutPopup(false)} />
			)}
		</>
	);
}
