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
						className={`
				inline-flex items-center justify-center gap-2
				px-6 py-2.5
				rounded-xl
				font-semibold
				transition-all duration-200
				active:scale-95
				disabled:opacity-60
				disabled:cursor-not-allowed
				${
					outline
						? "border-2 border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50"
						: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
				}
				${customClasses}
			`}
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


