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
		<div className="flex flex-col space-y-2">
			<label className="text-sm text-black-5" htmlFor={name}>
				{label} {!viewData && <sup className="text-pink-200">*</sup>}
			</label>

			{/* 🔥 IMPORTANT: rootProps ALWAYS here */}
			<div
				{...getRootProps()}
				className={`${
					isDragActive ? "bg-gray-200" : "bg-gray-100"
				} flex min-h-62.5 cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
			>
				{/* 🔥 REQUIRED INPUT */}
				<input {...getInputProps()} />

				{previewSource ? (
					<div className="flex w-full flex-col p-6">
						{!video ? (
							<img
								src={previewSource}
								alt="Preview"
								className="h-full w-full rounded-md object-cover"
							/>
						) : (
							<Player
								aspectRatio="16:9"
								playsInline
								src={previewSource}
							/>
						)}

						{!viewData && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation(); // 🔥 prevents file dialog
									setPreviewSource("");
									setSelectedFile(null);
									setValue(name, null);
								}}
								className="mt-3 text-black-400 underline"
							>
								Cancel
							</button>
						)}
					</div>
				) : (
					<div className="flex w-full flex-col items-center p-6">
						<div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
							<FiUploadCloud className="text-2xl text-yellow-50" />
						</div>

						<p className="mt-2 max-w-50 text-center text-sm text-black-200">
							Drag and drop an {!video ? "image" : "video"}, or
							click to{" "}
							<span className="font-semibold text-primary">
								Browse
							</span>{" "}
							a file
						</p>

						<ul className="mt-10 flex list-disc justify-between space-x-12 text-xs text-black-200">
							<li>Aspect ratio 16:9</li>
							<li>Recommended size 1024x576</li>
						</ul>
					</div>
				)}
			</div>

			{/* Error */}
			{errors[name] && (
				<span className="ml-2 text-xs tracking-wide text-red-600">
					{label} is required
				</span>
			)}
		</div>
	);
}
