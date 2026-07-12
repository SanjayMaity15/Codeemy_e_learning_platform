import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
	name,
	label,
	register,
	setValue,
	errors,
	video = false,
	viewData = null,
	editData = null,
}) {
	const { course } = useSelector((state) => state.course);

	const [selectedFile, setSelectedFile] = useState(null);
	const [previewSource, setPreviewSource] = useState(
		viewData ? viewData : editData ? editData : "",
	);

	// ✅ Handle file drop
	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			previewFile(file);
			setSelectedFile(file);
		}
	};

	// ✅ Dropzone setup
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: !video
			? { "image/*": [".jpeg", ".jpg", ".png"] }
			: { "video/*": [".mp4"] },
		onDrop,
	});

	// ✅ Preview file
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	// ✅ Register with react-hook-form
	useEffect(() => {
		register(name, { required: true });
	}, [register, name]);

	// ✅ Update form value when file changes
	useEffect(() => {
		setValue(name, selectedFile);
	}, [selectedFile, setValue, name]);

return (
	<div className="space-y-3">
		<label
			htmlFor={name}
			className="block text-sm font-semibold text-gray-700"
		>
			{label}
			{!viewData && <span className="ml-1 text-red-500">*</span>}
		</label>

		<div
			{...getRootProps()}
			className={`
				group relative overflow-hidden rounded-2xl border-2 border-dashed
				transition-all duration-300 cursor-pointer
				${
					isDragActive
						? "border-indigo-500 bg-indigo-50"
						: "border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50"
				}
			`}
		>
			<input {...getInputProps()} />

			{previewSource ? (
				<div className="relative p-5">
					{!video ? (
						<img
							src={previewSource}
							alt="Preview"
							className="w-full rounded-xl object-cover shadow-md max-h-87.5"
						/>
					) : (
						<div className="overflow-hidden rounded-xl shadow-lg">
							<Player
								aspectRatio="16:9"
								playsInline
								src={previewSource}
							/>
						</div>
					)}

					{!viewData && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setPreviewSource("");
								setSelectedFile(null);
								setValue(name, null);
							}}
							className="absolute right-8 top-8 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
						>
							Remove
						</button>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center px-8 py-14 text-center">
					<div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 transition group-hover:scale-105">
						<FiUploadCloud className="text-4xl text-indigo-600" />
					</div>

					<h3 className="text-lg font-semibold text-gray-800">
						Drop your {!video ? "image" : "video"} here
					</h3>

					<p className="mt-2 max-w-md text-sm text-gray-500">
						Drag & drop your file here or{" "}
						<span className="font-semibold text-indigo-600">
							click to browse
						</span>
					</p>

					<div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-4 text-sm">
						<div className="rounded-xl border bg-white p-4 shadow-sm">
							<p className="font-semibold text-gray-700">
								Aspect Ratio
							</p>
							<p className="mt-1 text-gray-500">16 : 9</p>
						</div>

						<div className="rounded-xl border bg-white p-4 shadow-sm">
							<p className="font-semibold text-gray-700">
								Recommended Size
							</p>
							<p className="mt-1 text-gray-500">1024 × 576 px</p>
						</div>
					</div>

					<p className="mt-6 text-xs text-gray-400">
						Supported formats:{" "}
						{video ? "MP4, MOV, WebM" : "JPG, PNG, JPEG, WEBP"}
					</p>
				</div>
			)}
		</div>

		{errors[name] && (
			<p className="text-sm font-medium text-red-500">
				{label} is required.
			</p>
		)}
	</div>
);
}
