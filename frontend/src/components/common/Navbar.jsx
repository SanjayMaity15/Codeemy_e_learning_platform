import React, { useEffect, useState } from "react";
import { FaBars, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropdown from "../auth/ProfileDropDown";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import brandImage from "../../assets/brand.png";

// Nav items component, reusable for desktop and mobile
const NavItems = ({ onClick, subLinks, isMobile }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation();

	const coursesRoute = location.pathname.split("/")[1] === "courses";

	return (
		<ul className="flex flex-col md:flex-row gap-4 md:gap-8">
			{NavbarLinks.map((currNavLink, index) => (
				<li
					key={index}
					className="text-black tracking-wide relative"
					onMouseEnter={() =>
						currNavLink.title === "Courses" && setShowDropdown(true)
					}
					onMouseLeave={() => setShowDropdown(false)}
				>
					{/* Normal Links */}
					{currNavLink.title !== "Courses" ? (
						<NavLink
							to={currNavLink.path}
							onClick={onClick}
							className={({ isActive }) =>
								isActive
									? "text-primary font-bold"
									: `hover:text-sm transition-all duration-300 ${isMobile && "text-black"}`
							}
						>
							{currNavLink.title}
						</NavLink>
					) : (
						<>
							{/* Courses Button */}
							<div
								onClick={() => {
									if (isMobile) {
										setShowDropdown((prev) => !prev);
									}
								}}
								className={`cursor-pointer flex items-center ${
									coursesRoute
										? "text-primary font-bold"
										: `${isMobile && "text-black"}`
								}`}
							>
								{currNavLink.title}
								{showDropdown ? (
									<MdArrowDropUp className="text-2xl" />
								) : (
									<MdArrowDropDown className="text-2xl" />
								)}
							</div>

							{/* 🔥 Dropdown */}
							{showDropdown && (
								<div
									className={`absolute top-7 left-1/2 -translate-x-1/2 z-2000 min-w-60 rounded-xl border border-gray-200 bg-white shadow-xl ${
										isMobile
											? "max-h-60 overflow-y-auto"
											: ""
									}`}
								>
									<div className="w-6 h-6 bg-white relative left-1/2 -translate-x-1/2 rotate-45 bottom-2 " />
									{subLinks?.length > 0 ? (
										subLinks.map((cat) => (
											<NavLink
												key={cat._id}
												to={`/courses/${cat.name
													.toLowerCase()
													.replace(/\s+/g, "-")}`}
												onClick={onClick}
												className={({ isActive }) =>
													`block px-5 py-2 text-xs transition-all duration-200 ${
														isActive
															? "bg-indigo-50 text-indigo-600 font-medium"
															: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
													}`
												}
											>
												{cat.name}
											</NavLink>
										))
									) : (
										<div className="px-5 py-4 text-sm text-gray-500">
											No Categories Found
										</div>
									)}
								</div>
							)}
						</>
					)}
				</li>
			))}
		</ul>
	);
};

const Navbar = () => {
	const { token } = useSelector((state) => state.auth);

	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	const [navBgActive, setNavBgActive] = useState(false);
	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [subLinks, setSubLinks] = useState([]);
	const isMobile = window.innerWidth < 768;

	// Toggle background shadow on scroll
	useEffect(() => {
		const handleNavBg = () => {
			if (window.scrollY > 50) {
				setNavBgActive(true);
			} else {
				setNavBgActive(false);
			}
		};

		window.addEventListener("scroll", handleNavBg);
		return () => window.removeEventListener("scroll", handleNavBg);
	}, []);

	useEffect(() => {
		(async () => {
			// setLoading(true);
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}course/showAllCategories`,
					{ withCredentials: true },
				);
				setSubLinks(res.data.data);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			}
			// setLoading(false);
		})();
	}, []);

	console.log({ token, user });

	return (
		<section
			className={`sticky top-0 h-20 w-full z-20 transition-shadow ${
				navBgActive || isMobile
					? "shadow-md outline backdrop-blur-xs "
					: "bg-transparent"
			}`}
		>
			<div className="section-container relative z-20 h-20 flex justify-between items-center">
				{/* Logo / Name */}
				<div>
					<Link to="/" className="flex items-center">
						<img
							src={brandImage}
							alt="codeemy"
							className="w-20 mb-3 selection:none"
						/>
						<p className="bg-linear-to-b from-indigo-600 to-pink-600 bg-clip-text text-transparent font-bold tracking-wide text-3xl font-orbitron select-none -ml-5">
							odeemy
						</p>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:block">
					<NavItems subLinks={subLinks} />
				</div>

				{/* Login/SignUp/Dashboard */}
				<div className="flex gap-x-4 items-center">
					{user &&
						user?.accountType !== "Admin" &&
						user?.accountType !== "Instructor" && (
							<Link
								to="/dashboard/cart"
								className="relative text-black text-2xl md:flex items-center hidden"
							>
								<AiOutlineShoppingCart />

								{totalItems > 0 && (
									<span className="bg-pink-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute left-4 top-2.5 font-bold">
										{totalItems}
									</span>
								)}
							</Link>
						)}

					{token === null && (
						<Link to="/login">
							<button className="hidden md:block px-8 py-3 rounded-full shadow-sm border border-indigo-800 bg-indigo-600 hover:border-indigo-400   font-semibold hover:opacity-95 transition cursor-pointer text-white font-orbitron">
								Get's started
							</button>
						</Link>
					)}
					{token !== null && (
						<div className="hidden md:block">
							<ProfileDropdown />
						</div>
					)}
				</div>

				{/* Mobile menu setup */}

				{/* Hamburger */}
				<div className="md:hidden z-50">
					<button
						onClick={() =>
							setIsMobileMenuActive(!isMobileMenuActive)
						}
						className="text-2xl text-primary"
					>
						{isMobileMenuActive ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				{/* Overlay */}
				<div
					className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
						isMobileMenuActive
							? "opacity-100 visible"
							: "opacity-0 invisible"
					}`}
					onClick={() => setIsMobileMenuActive(false)}
				></div>

				{/* Mobile Drawer */}
				<div
					className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
						isMobileMenuActive
							? "translate-x-0"
							: "-translate-x-full opacity-0"
					}`}
				>
					{/* Header */}
					<div className="flex items-center justify-between border-b px-6 py-5">
						<h2 className="text-xl font-bold text-primary">
							Codeemy
						</h2>

						<button
							onClick={() => setIsMobileMenuActive(false)}
							className="text-2xl text-gray-700"
						>
							<FaTimes />
						</button>
					</div>

					{/* Profile */}
					<div className="px-5 py-4">
						{token && <ProfileDropdown />}
					</div>

					{/* Cart */}
					{user &&
						user.accountType !== "Instructor" &&
						user.accountType !== "Admin" && (
							<Link
								to="/dashboard/cart"
								onClick={() => setIsMobileMenuActive(false)}
								className="mx-5 mb-5 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 hover:bg-gray-200"
							>
								<div className="flex items-center gap-3">
									<AiOutlineShoppingCart
										size={22}
										className="text-primary"
									/>
									<span className="font-medium">Cart</span>
								</div>

								{totalItems > 0 && (
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
										{totalItems}
									</span>
								)}
							</Link>
						)}

					{/* Navigation */}
					<div className="px-5">
						<NavItems
							subLinks={subLinks}
							isMobile={true}
							onClick={() => setIsMobileMenuActive(false)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Navbar;
