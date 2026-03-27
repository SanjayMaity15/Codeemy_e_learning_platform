import axios from "axios"
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}profile/getEnrolledCourses`, {withCredentials: true}) // Getting all the published and thedrafted courses

        const res = result.data.data;

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(enrolledCourses);

  return (
		<>
			<div className="text-2xl font-semibold">Enrolled Courses</div>
			{!enrolledCourses ? (
				<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
					<div className="spinner"></div>
				</div>
			) : !enrolledCourses.length ? (
				<p className="grid h-[10vh] w-full place-content-center">
					You have not enrolled in any course yet.
					{/* TODO: Modify this Empty State */}
				</p>
			) : (
				<div className="my-8 text-richblack-5">
					{/* Headings */}
					<div className="flex rounded-t-lg bg-richblack-500 ">
						<p className="w-[45%] px-5 py-3 font-semibold">
							Course Name
						</p>
						<p className="w-1/4 px-2 py-3 font-semibold">
							Duration
						</p>
						<p className="flex-1 px-2 py-3 font-semibold">
							Progress
						</p>
					</div>
					{/* Course Names */}
					{enrolledCourses.map((course, i, arr) => (
						<div
							className={`flex items-center border border-richblack-700 ${
								i === arr.length - 1
									? "rounded-b-lg"
									: "rounded-none"
							}`}
							key={i}
						>
							<div
								className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
								onClick={() => {
									navigate(
										`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`,
									);
								}}
							>
								<img
									src={course.thumbnail}
									alt="course_img"
									className="h-14 w-14 rounded-lg object-cover"
								/>
								<div className="flex max-w-xs flex-col gap-2">
									<p className="font-semibold text-primary">
										{course.courseName}
									</p>
									<p className="text-xs text-richblack-300">
										{course.courseDescription.length > 50
											? `${course.courseDescription.slice(0, 50)}...`
											: course.courseDescription}
									</p>
								</div>
							</div>
							<div className="w-1/4 px-2 py-3">
								{course?.totalDuration}
							</div>
							<div className="flex w-1/5 flex-col gap-2 px-2 py-3">
								<p>
									Progress: {course.progressPercentage || 0}%
								</p>
								<ProgressBar
									completed={course.progressPercentage || 0}
									height="8px"
									isLabelVisible={false}
									bgColor="#4f46e5"
									baseBgColor="#A5B4FC"
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</>
  );
}
