import ButtonLoader from "./ButtonLoader";

export default function IconBtn({
	text,
	onclick,
	children,
	disabled,
	outline = false,
	customClasses,
	type,
	loading,
}) {
	return (
		<button
			disabled={disabled}
			onClick={onclick}
			className={`flex items-center gap-1 cursor-pointer bg-indigo-500 px-6 py-2 rounded-sm text-white font-semibold hover:bg-indigo-600 ${customClasses}`}
			type={type}
		>
			{loading ? (
				<ButtonLoader />
			) : children ? (
				<>
					<span className={`${outline && "text-yellow-50"}`}>
						{text}
					</span>
					{children}
				</>
			) : (
				text
			)}
		</button>
	);
}
