import { useEffect, useRef, useState } from "react";

import { VscDashboard, VscRequestChanges, VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import Logout from "./Logout";
import { gsap } from "gsap";

export default function ProfileDropdown() {
	const { user } = useSelector((state) => state.profile);
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	const navigate = useNavigate();
	const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
	useOnClickOutside(ref, () => setOpen(false));

	const dropDownRef = useRef(null);

	useEffect(() => {
		if (!open || !dropDownRef.current) return;

		gsap.fromTo(
			dropDownRef.current,
			{
				x: 100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.4,
				ease: "power2.out",
			},
		);
	}, [open]);

	if (!user) return null;

	return (
		<div ref={ref} className="relative z-40 ">
			{/* Profile Button */}
			<button
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center gap-x-1 cursor-pointer"
			>
				<img
					src={user.image}
					alt={`profile-${user.firstName}`}
					className="aspect-square w-10 rounded-full object-cover "
				/>
			</button>

			{/* Dropdown */}
			{open && (
				<div
					className="absolute top-[150%] -right-2 z-10000"
					ref={dropDownRef}
				>
					{/* Menu */}
					<div className="overflow-hidden rounded-sm border border-primary bg-white transition">
						<Link
							to="/dashboard/my-profile"
							onClick={() => setOpen(false)}
						>
							<div className="flex items-center gap-x-2 px-4 py-2.5 text-sm hover:bg-pink-200">
								<VscDashboard />
								Dashboard
							</div>
						</Link>

						<div
							onClick={() => {
								(setOpen(false), setOpenLogoutPopup(true));
							}}
							className="flex cursor-pointer items-center gap-x-2 px-4 py-2.5 text-sm  hover:bg-pink-200"
						>
							<VscSignOut />
							Logout
						</div>
						<div
							onClick={() => {
								(setOpen(false), navigate("/change-password"));
							}}
							className="flex cursor-pointer items-center gap-x-2 px-4 py-2.5 text-sm hover:bg-pink-200"
						>
							<VscRequestChanges />
							Change Password
						</div>
					</div>
				</div>
			)}

			{/* logout popup */}

			{openLogoutPopup && (
				<Logout onClose={() => setOpenLogoutPopup(false)} />
			)}
		</div>
	);
}
