import * as VscIcons from "react-icons/vsc";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as F6Icons from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// ✅ IMPORT THIS (VERY IMPORTANT)
import { resetCourseState } from "../../feature/courseSlice";

export default function SidebarLink({ link, iconName }) {
	const Icons = {
		...VscIcons,
		...FiIcons,
		...MdIcons,
		...F6Icons,
	};

	const Icon = Icons[iconName];
	const dispatch = useDispatch();

	return (
		<NavLink
			to={link.path}
			onClick={() => dispatch(resetCourseState())}
			className={({ isActive }) =>
				`group mx-2 my-1 flex items-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
					isActive
						? "bg-linear-to-r from-pink-100 to-pink-200 text-primary shadow-md"
						: "text-gray-600 hover:bg-pink-50 hover:text-primary hover:shadow-sm"
				}`
			}
		>
			{/* Active Indicator */}
			<div
				className={`mr-3 h-8 w-1 rounded-full transition-all duration-300 ${
					window.location.pathname === link.path
						? "bg-primary"
						: "bg-transparent"
				}`}
			/>

			{/* Icon */}
			<Icon
				className={`text-xl transition-transform duration-300 ${
					window.location.pathname === link.path
						? "scale-110"
						: "group-hover:scale-110"
				}`}
			/>

			{/* Text */}
			<span className="ml-3 tracking-wide">{link.name}</span>
		</NavLink>
	);
}
