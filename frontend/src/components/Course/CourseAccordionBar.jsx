import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])
return (
	<div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
		{/* Section Header */}
		<div
			onClick={() => handleActive(course._id)}
			className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-gray-50"
		>
			<div className="flex items-center gap-3">
				<div
					className={`flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-primary transition-transform duration-300 ${
						isActive.includes(course._id) ? "rotate-180" : ""
					}`}
				>
					<AiOutlineDown size={16} />
				</div>

				<div>
					<h3 className="font-semibold text-gray-800">
						{course?.sectionName}
					</h3>

					<p className="text-sm text-gray-500">
						{course?.subSection?.length || 0} lecture
						{course?.subSection?.length !== 1 && "s"}
					</p>
				</div>
			</div>

			<span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-primary">
				{course?.subSection?.length || 0}
			</span>
		</div>

		{/* Accordion Body */}
		<div
			ref={contentEl}
			className="overflow-hidden transition-all duration-300"
			style={{ height: sectionHeight }}
		>
			<div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
				<div className="flex flex-col gap-3">
					{course?.subSection?.map((subSec, i) => (
						<CourseSubSectionAccordion key={i} subSec={subSec} />
					))}
				</div>
			</div>
		</div>
	</div>
);
}
