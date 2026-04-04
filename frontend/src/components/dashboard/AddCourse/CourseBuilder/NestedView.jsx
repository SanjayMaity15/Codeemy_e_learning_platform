import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { setCourse } from "../../../../feature/courseSlice";
import ConfirmationModal from "../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
import axios from "axios";

export default function NestedView({ handleChangeEditSectionName }) {
	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	// States to keep track of mode of modal [add, view, edit]
	const [addSubSection, setAddSubsection] = useState(null);
	const [viewSubSection, setViewSubSection] = useState(null);
	const [editSubSection, setEditSubSection] = useState(null);
	// to keep track of confirmation modal
	const [confirmationModal, setConfirmationModal] = useState(null);

	const handleDeleleSection = async (sectionId) => {
		const result = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}course/deleteSection`,
			{
				sectionId,
				courseId: course._id,
			},
			{
				withCredentials: true,
			},
		);
		if (result.data.data) {
			dispatch(setCourse(result.data.data));
		}
		setConfirmationModal(null);
	};

	const handleDeleteSubSection = async (subSectionId, sectionId) => {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}course/deleteSubSection`,
			{ sectionId, subSectionId },
			{ withCredentials: true },
		);

		const result = response.data.data;

		if (result) {
			// update the structure of course
			const updatedCourseContent = course.courseContent.map((section) =>
				section._id === sectionId ? result : section,
			);
			const updatedCourse = {
				...course,
				courseContent: updatedCourseContent,
			};
			dispatch(setCourse(updatedCourse));
		}
		setConfirmationModal(null);
	};

	return (
		<>
			<div
				className="rounded-lg bg-gray-100 md:p-6 md:px-8"
				id="nestedViewContainer"
			>
				{course?.courseContent?.map((section) => (
					// Section Dropdown
					<details key={section._id} open>
						{/* Section Dropdown Content */}
						<summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
							<div className="flex items-center gap-x-3">
								<RxDropdownMenu className="text-2xl text-black-50" />
								<p className="font-semibold text-black-50 text-sm">
									{section.sectionName}
								</p>
							</div>
							<div className="flex items-center gap-x-3">
								<button
									onClick={() =>
										handleChangeEditSectionName(
											section._id,
											section.sectionName,
										)
									}
								>
									<MdEdit className="text-xl text-black-300" />
								</button>
								<button
									onClick={() =>
										setConfirmationModal({
											text1: "Delete this Section?",
											text2: "All the lectures in this section will be deleted",
											btn1Text: "Delete",
											btn2Text: "Cancel",
											loadingText: "Deleting",
											btn1Handler: () =>
												handleDeleleSection(
													section._id,
												),
											btn2Handler: () =>
												setConfirmationModal(null),
										})
									}
								>
									<RiDeleteBin6Line className="text-xl text-black-300" />
								</button>
								<span className="font-medium text-black-300">
									|
								</span>
								<AiFillCaretDown
									className={`text-xl text-black-300`}
								/>
							</div>
						</summary>
						<div className="px-6 pb-4">
							{/* Render All Sub Sections Within a Section */}
							{section.subSection.map((data) => (
								<div
									key={data?._id}
									onClick={() => setViewSubSection(data)}
									className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
								>
									<div className="flex items-center gap-x-3 py-2 ">
										<RxDropdownMenu className="text-2xl text-black-50" />
										<p className="font-semibold text-black-50 text-xs">
											{data.title}
										</p>
									</div>
									<div
										onClick={(e) => e.stopPropagation()}
										className="flex items-center gap-x-3"
									>
										<button
											onClick={() =>
												setEditSubSection({
													...data,
													sectionId: section._id,
												})
											}
										>
											<MdEdit className="text-xl text-black-300" />
										</button>
										<button
											onClick={() =>
												setConfirmationModal({
													text1: "Delete this Sub-Section?",
													text2: "This lecture will be deleted",
													btn1Text: "Delete",
													btn2Text: "Cancel",
													btn1Handler: () =>
														handleDeleteSubSection(
															data._id,
															section._id,
														),
													btn2Handler: () =>
														setConfirmationModal(
															null,
														),
												})
											}
										>
											<RiDeleteBin6Line className="text-xl text-black-300" />
										</button>
									</div>
								</div>
							))}
							{/* Add New Lecture to Section */}
							<button
								onClick={() => setAddSubsection(section._id)}
								className="mt-3 flex items-center gap-x-1 text-primary cursor-pointer"
							>
								<FaPlus className="text-lg" />
								<p>Add Lecture</p>
							</button>
						</div>
					</details>
				))}
			</div>
			{/* Modal Display */}
			{addSubSection ? (
				<SubSectionModal
					modalData={addSubSection}
					setModalData={setAddSubsection}
					add={true}
				/>
			) : viewSubSection ? (
				<SubSectionModal
					modalData={viewSubSection}
					setModalData={setViewSubSection}
					view={true}
				/>
			) : editSubSection ? (
				<SubSectionModal
					modalData={editSubSection}
					setModalData={setEditSubSection}
					edit={true}
				/>
			) : (
				<></>
			)}
			{/* Confirmation Modal */}
			{confirmationModal ? (
				<ConfirmationModal modalData={confirmationModal} />
			) : (
				<></>
			)}
		</>
	);
}
