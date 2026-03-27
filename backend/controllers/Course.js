const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");

const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Subsection = require("../models/Subsection");
// Function to create a new course
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;
		if (!req.user.approved) {
			return res.status(401).json({
				success: false,
				message: "Not verified contact Admin",
			});
		}

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag: _tag,
			category,
			status,
			instructions: _instructions,
		} = req.body;
		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Convert the tag and instructions from stringified Array to Array
		const tag = JSON.parse(_tag);
		const instructions = JSON.parse(_instructions);

		console.log("tag", tag);
		console.log("instructions", instructions);

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag.length ||
			!thumbnail ||
			!category ||
			!instructions.length
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME,
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true },
		);
		// Add the new course to the Categories
		const categoryDetails2 = await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true },
		);
		console.log("HEREEEEEEEE", categoryDetails2);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// Edit Course Details
exports.editCourse = async (req, res) => {
	try {
		if (!req.user.approved) {
			return res.status(401).json({
				success: false,
				message: "Not verified contact Admin",
			});
		}

		const { courseId, ...updates } = req.body;

		const course = await Course.findById(courseId);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		// ✅ Safe thumbnail update
		if (req.files && req.files.thumbnailImage) {
			console.log("thumbnail update");

			const thumbnail = req.files.thumbnailImage;

			const thumbnailImage = await uploadImageToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME,
			);

			course.thumbnail = thumbnailImage.secure_url;
		}

		// ✅ Update fields safely (NO hasOwnProperty)
		for (const key in updates) {
			if (updates[key] !== undefined) {
				if (key === "tag" || key === "instructions") {
					try {
						course[key] =
							typeof updates[key] === "string"
								? JSON.parse(updates[key])
								: updates[key];
					} catch (err) {
						return res.status(400).json({
							success: false,
							message: `Invalid JSON format for ${key}`,
						});
					}
				} else {
					course[key] = updates[key];
				}
			}
		}

		await course.save();

		const updatedCourse = await Course.findById(courseId)
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			});

		return res.json({
			success: true,
			message: "Course updated successfully",
			data: updatedCourse,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			},
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
	try {
		//get id
		const { courseId } = req.body;
		//find course details
		const courseDetails = await Course.find({ _id: courseId })
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			//.populate("ratingAndreviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		//validation
		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find the course with ${courseId}`,
			});
		}
		//return response
		return res.status(200).json({
			success: true,
			message: "Course Details fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getFullCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.id;
		const courseDetails = await Course.findOne({
			_id: courseId,
		})
			.populate({
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		let courseProgressCount = await CourseProgress.findOne({
			courseID: courseId,
			userId: userId,
		});

		console.log("courseProgressCount : ", courseProgressCount);

		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find course with id: ${courseId}`,
			});
		}


		let totalDurationInSeconds = 0;
		courseDetails.courseContent.forEach((content) => {
			content.subSection.forEach((subSection) => {
				const timeDurationInSeconds = parseInt(subSection.timeDuration);
				totalDurationInSeconds += timeDurationInSeconds;
			});
		});

		const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

		return res.status(200).json({
			success: true,
			data: {
				courseDetails,
				totalDuration,
				completedVideos: courseProgressCount?.completedVideos
					? courseProgressCount?.completedVideos
					: [],
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
	try {
		// Get the instructor ID from the authenticated user or request body
		const instructorId = req.user.id;
		console.log(instructorId);

		// Find all courses belonging to the instructor
		const instructorCourses = await Course.find({
			instructor: instructorId,
		})
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.sort({ createdAt: -1 });

		const coursesWithDuration = instructorCourses.map((course) => {
			let totalDurationInSeconds = 0;

			course.courseContent.forEach((section) => {
				section.subSection.forEach((sub) => {
					totalDurationInSeconds += parseInt(sub.timeDuration || 0);
				});
			});

			const totalDuration = convertSecondsToDuration(
				totalDurationInSeconds,
			);

			return {
				...course.toObject(),
				totalDuration,
			};
		});

		console.log(instructorCourses);
		// Return the instructor's courses
		res.status(200).json({
			success: true,
			data: coursesWithDuration,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to retrieve instructor courses",
			error: error.message,
		});
	}
};

// Delete the Course
exports.deleteCourse = async (req, res) => {
	try {
		const { courseId } = req.body;

		console.log(req.user);
		console.log(req.user.approved);
		if (!req.user.approved) {
			return res.status(401).json({
				success: false,
				message: "Not verified contact Admin",
			});
		}

		// Find the course
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}

		// Unenroll students from the course
		const studentsEnrolled = course.studentsEnrolled;
		for (const studentId of studentsEnrolled) {
			await User.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId },
			});
		}

		// Delete sections and sub-sections
		const courseSections = course.courseContent;
		for (const sectionId of courseSections) {
			// Delete sub-sections of the section
			const section = await Section.findById(sectionId);
			if (section) {
				const subSections = section.subSection;
				for (const subSectionId of subSections) {
					await Subsection.findByIdAndDelete(subSectionId);
				}
			}

			// Delete the section
			await Section.findByIdAndDelete(sectionId);
		}

		// Delete the course
		await Course.findByIdAndDelete(courseId);

		return res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};
