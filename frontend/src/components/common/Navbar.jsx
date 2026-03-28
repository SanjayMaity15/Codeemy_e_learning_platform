import React, { useEffect, useState } from "react";
import { FaBars, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropdown from "../auth/ProfileDropDown";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

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
									: `hover:text-sm transition-all duration-300 ${isMobile && "text-white"}`
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
										: `${isMobile && "text-white"}`
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
									className={`absolute top-8 -left-18 bg-white border border-primary rounded-md min-w-55  z-2000 text-sm ${isMobile ? "max-h-50 overflow-y-auto" : ""}`}
								>
									<div className="w-5 h-5 bg-white relative left-1/2 -translate-x-1/2 rotate-45 bottom-2 " />

									{subLinks?.length > 0 ? (
										subLinks.map((cat) => (
											<NavLink
												key={cat._id}
												to={`/courses/${cat.name
													.toLowerCase()
													.replace(/\s+/g, "-")}`} // slug
												onClick={onClick}
												className="block px-3 py-2 hover:bg-indigo-400  hover:text-white "
											>
												{cat.name}
											</NavLink>
										))
									) : (
										<p className="text-sm text-gray-400">
											No Categories
										</p>
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
	const [loading, setLoading] = useState(false);
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
			setLoading(true);
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_URL}course/showAllCategories`,
					{ withCredentials: true },
				);
				setSubLinks(res.data.data);
			} catch (error) {
				console.log("Could not fetch Categories.", error);
			}
			setLoading(false);
		})();
	}, []);

	return (
		<section
			className={`sticky top-0 h-20 w-full z-20 transition-shadow ${
				navBgActive ? "shadow-md backdrop-blur-xs " : "bg-transparent"
			}`}
		>
			<div className="section-container relative z-20 h-20 flex justify-between items-center">
				{/* Logo / Name */}
				<div>
					<Link to="/">
						<p className="bg-linear-to-b from-indigo-600 to-pink-600 bg-clip-text text-transparent font-bold tracking-wide text-3xl font-orbitron select-none">
							<span className="text-4xl">C</span>odeemy
						</p>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:block">
					<NavItems subLinks={subLinks} />
				</div>

				{/* Login/SignUp/Dashboard */}
				<div className="flex gap-x-4 items-center">
					{user && (user?.accountType != "Instructor" || "Admin") && (
						<Link
							to="/dashboard/cart"
							className="relative text-black text-2xl md:flex items-center hidden "
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
							<button className="px-8 py-3 rounded-full shadow-sm border border-indigo-800 bg-indigo-600 hover:border-indigo-400   font-semibold hover:opacity-95 transition cursor-pointer text-white font-orbitron">
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

				{/* Hamburger Toggle */}
				<div className="md:hidden z-40">
					<button
						onClick={() =>
							setIsMobileMenuActive(!isMobileMenuActive)
						}
						className="text-xl"
					>
						{isMobileMenuActive ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden fixed top-0 left-0 w-full mt-20 h-full bg-black/80 flex flex-col justify-start pt-12 gap-4 items-center text-center transition-transform duration-300 z-2000  ${
						isMobileMenuActive
							? "translate-x-0"
							: "-translate-x-full"
					}`}
				>
					{token !== null && <ProfileDropdown />}

					<div className="">
						{" "}
						{user &&
							(user?.accountType != "Instructor" || "Admin") && (
								<Link
									to="/dashboard/cart"
									className="relative text-white text-lg flex gap-2 items-center text-left"
								>
									<span>Cart</span>
									<AiOutlineShoppingCart />
									{totalItems > 0 && (
										<span className="bg-pink-500 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full absolute left-4 top-2.5 font-bold">
											{totalItems}
										</span>
									)}
								</Link>
							)}
					</div>

					<NavItems
						subLinks={subLinks}
						isMobile={isMobile}
						onClick={() => setIsMobileMenuActive(false)}
					/>
				</div>
			</div>
		</section>
	);
};

export default Navbar;
