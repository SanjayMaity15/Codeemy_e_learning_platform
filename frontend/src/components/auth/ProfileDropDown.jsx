import { useEffect, useRef, useState } from "react";
import { VscDashboard, VscRequestChanges, VscSignOut } from "react-icons/vsc";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logout from "./Logout";

export default function ProfileDropdown() {
	const { user } = useSelector((state) => state.profile);

	const [open, setOpen] = useState(false);
	const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

	const navigate = useNavigate();

	const ref = useRef(null);
	const dropDownRef = useRef(null);

	useOnClickOutside(ref, () => setOpen(false));

	useEffect(() => {
		if (!open || !dropDownRef.current) return;

		gsap.fromTo(
			dropDownRef.current,
			{
				opacity: 0,
				y: -15,
				scale: 0.96,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.25,
				ease: "power3.out",
			},
		);
	}, [open]);

	if (!user) return null;

	return (
		<div className="relative z-50" ref={ref}>
			{/* Profile Image */}

			<button
				onClick={() => setOpen((prev) => !prev)}
				className="transition hover:scale-105"
			>
				<img
					src={user.image}
					alt={user.firstName}
					className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover shadow-md"
				/>
			</button>

			{/* Dropdown */}

			{open && (
				<div
					ref={dropDownRef}
					className="absolute right-0 top-14 w-62 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
				>
					{/* User Info */}

					<div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-5 text-white">
						<div className="flex items-center gap-3">
							<img
								src={user.image}
								alt={user.firstName}
								className="h-14 w-14 rounded-full border-2 border-white object-cover"
							/>

							<div className="overflow-hidden">
								<h3 className="truncate text-lg font-semibold">
									{user.firstName} {user.lastName}
								</h3>

								<p className="truncate text-sm text-indigo-100">
									{user.email}
								</p>
							</div>
						</div>
					</div>

					{/* Menu */}

					<div className="py-2">
						<Link
							to="/dashboard/my-profile"
							onClick={() => setOpen(false)}
							className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-indigo-50"
						>
							<HiOutlineUserCircle
								size={20}
								className="text-indigo-600"
							/>

							<span className="font-medium">My Dashboard</span>
						</Link>

						<button
							onClick={() => {
								setOpen(false);
								navigate("/change-password");
							}}
							className="mx-2 flex w-[calc(100%-16px)] items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-yellow-50"
						>
							<VscRequestChanges
								size={18}
								className="text-yellow-600"
							/>

							<span className="font-medium">Change Password</span>
						</button>

						<hr className="my-2" />

						<button
							onClick={() => {
								setOpen(false);
								setOpenLogoutPopup(true);
							}}
							className="mx-2 flex w-[calc(100%-16px)] items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
						>
							<VscSignOut size={18} />

							<span className="font-semibold">Logout</span>
						</button>
					</div>
				</div>
			)}

			{openLogoutPopup && (
				<Logout onClose={() => setOpenLogoutPopup(false)} />
			)}
		</div>
	);
}
