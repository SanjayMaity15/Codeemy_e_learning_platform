import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import PageTitle from "../components/common/HelmetForTitle";
import { FiSidebar } from "react-icons/fi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useState } from "react";

function Dashboard() {
	const { loading: profileLoading } = useSelector((state) => state.profile);
	const { loading: authLoading } = useSelector((state) => state.auth);

	const [isMobileMenu, setIsMobileMenu] = useState(false);

	if (profileLoading || authLoading) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<div className="spinner"></div>
			</div>
		);
	}

	console.log(isMobileMenu);

	return (
		<div className="relative flex min-h-screen">
			<PageTitle title={"Dashboard"} />
			<button
				className="md:hidden absolute left-3 sm:left-8 top-4 font-bold text-2xl"
				onClick={(e) => setIsMobileMenu(true)}
			>
				<HiOutlineMenuAlt1 className="font-semibold" />
			</button>
			{isMobileMenu && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setIsMobileMenu(false)}
				/>
			)}
			<div
				className={`fixed top-20 inset-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${isMobileMenu ? "translate-x-0 z-40" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
			>
				<Sidebar />
			</div>
			<div className="flex-1 mt-4 overflow-auto">
				<div className="mx-auto w-11/12 max-w-250 py-10">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
