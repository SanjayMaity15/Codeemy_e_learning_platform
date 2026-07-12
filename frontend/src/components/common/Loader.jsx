export default function Loader() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="flex flex-col items-center gap-5">
				<div className="relative h-16 w-16">
					<div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
					<div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600"></div>
				</div>

				<p className="text-sm font-medium text-gray-500 animate-pulse">
					Loading...
				</p>
			</div>
		</div>
	);
}
