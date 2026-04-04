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
				`relative px-8 py-2 text-sm font-medium ${
					isActive
						? "bg-pink-200 text-pink-700 border-r-4 border-r-pink-600"
						: "hover:bg-pink-100"
				} transition-all duration-200`
			}
		>
			<div className="flex items-center gap-x-2">
				<Icon className="text-lg" />
				<span>{link.name}</span>
			</div>
		</NavLink>
	);
}
