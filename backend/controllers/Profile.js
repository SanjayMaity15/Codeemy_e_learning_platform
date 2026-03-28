const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Payment = require("../models/Payment");
const Profile = require("../models/Profile");
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndRaview");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const RatingAndRaview = require("../models/RatingAndRaview");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const {
			firstName = "",
			lastName = "",
			dateOfBirth = "",
			about = "",
			contactNumber,
			gender = "",
		} = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findByIdAndUpdate(
			{ _id: id },
			{ firstName, lastName },
			{ new: true },
		);

		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender = gender;

		// Save the updated profile
		await profile.save();

		const user = await User.findById(id)
			.select("-password")
			.populate("additionalDetails");

		return res.json({
			success: true,
			message: "Profile updated successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const userId = req.user.id;
		console.log("Deleting user:", userId);

		const user = await User.findById(userId).session(session);

		if (!user) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Delete Profile
		await Profile.findByIdAndDelete(user.additionalDetails).session(
			session,
		);

		// Unenroll from all courses
		const enrolledCourses = user.courses;

		await Promise.all(
			enrolledCourses.map((courseId) =>
				Course.findByIdAndUpdate(
					courseId,
					{ $pull: { studentsEnrolled: userId } },
					{ session },
				),
			),
		);

		// Delete Course Progress
		await CourseProgress.deleteMany({ userId }, { session });

		// Delete Payment History
		await Payment.deleteMany({ user: userId }, { session });

		// Find all reviews of this user
		const userReviews = await RatingAndReview.find({
			user: userId,
		}).session(session);

		// Extract review IDs
		const reviewIds = userReviews.map((r) => r._id);

		// Remove these reviews from courses
		await Course.updateMany(
			{ ratingAndReviews: { $in: reviewIds } },
			{ $pull: { ratingAndReviews: { $in: reviewIds } } },
			{ session },
		);

		// Delete reviews
		await RatingAndReview.deleteMany({ user: userId }, { session });

		// Delete User
		await User.findByIdAndDelete(userId, { session });

		// Commit Transaction
		await session.commitTransaction();
		session.endSession();

		res.clearCookie("token", {
			httpOnly: true,
			secure: true, // production এ true
			sameSite: "none", // যদি cross-origin হয়
		})
			.status(200)
			.json({
				success: true,
				message: "User deleted successfully",
			});
	} catch (error) {
		console.log(error);

		// ❌ Rollback everything
		await session.abortTransaction();
		session.endSession();

		return res.status(500).json({
			success: false,
			message: "User deletion failed",
			error: error.message,
		});
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture;
		console.log(displayPicture);
		const userId = req.user.id;
		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000,
		);
		console.log(image);
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true },
		)
			.select("-password")
			.populate("additionalDetails");
		res.send({
			success: true,
			message: `Image Updated successfully`,
			updatedProfile,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id;
		let userDetails = await User.findOne({
			_id: userId,
		})
			.populate({
				path: "courses",
				populate: {
					path: "courseContent",
					populate: {
						path: "subSection",
					},
				},
			})
			.exec();
		userDetails = userDetails.toObject();
		var SubsectionLength = 0;
		for (var i = 0; i < userDetails.courses.length; i++) {
			let totalDurationInSeconds = 0;
			SubsectionLength = 0;
			for (
				var j = 0;
				j < userDetails.courses[i].courseContent.length;
				j++
			) {
				totalDurationInSeconds += userDetails.courses[i].courseContent[
					j
				].subSection.reduce(
					(acc, curr) => acc + parseInt(curr.timeDuration),
					0,
				);
				userDetails.courses[i].totalDuration = convertSecondsToDuration(
					totalDurationInSeconds,
				);
				SubsectionLength +=
					userDetails.courses[i].courseContent[j].subSection.length;
			}
			let courseProgressCount = await CourseProgress.findOne({
				courseID: userDetails.courses[i]._id,
				userId: userId,
			});
			courseProgressCount = courseProgressCount?.completedVideos.length;
			if (SubsectionLength === 0) {
				userDetails.courses[i].progressPercentage = 100;
			} else {
				// To make it up to 2 decimal point
				const multiplier = Math.pow(10, 2);
				userDetails.courses[i].progressPercentage =
					Math.round(
						(courseProgressCount / SubsectionLength) *
							100 *
							multiplier,
					) / multiplier;
			}
		}

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userDetails}`,
			});
		}
		return res.status(200).json({
			success: true,
			data: userDetails.courses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.instructorDashboard = async (req, res) => {
	try {
		const courseDetails = await Course.find({ instructor: req.user.id });

		const courseData = courseDetails.map((course) => {
			const totalStudentsEnrolled = course.studentsEnrolled.length;
			const totalAmountGenerated = totalStudentsEnrolled * course.price;

			// Create a new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				// Include other course properties as needed
				totalStudentsEnrolled,
				totalAmountGenerated,
			};

			return courseDataWithStats;
		});

		res.status(200).json({ courses: courseData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

exports.getAllOwnReviews = async (req, res) => {
	try {
		const reviews = await RatingAndRaview.find({ user: req.user.id }).populate("course", "courseName");

		if (reviews.length === 0) {
			return res.status(400).json({
				success: false,
				message: "No review found",
			});
		}

		res.status(200).json({
			message: "Reviews fetch successfully",
			data: reviews,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

exports.editReview = async (req, res) => {
	try {
		const { reviewId, rating, review } = req.body;

		if (!reviewId) {
			return res.status(400).json({
				message: "Id not found",
			});
		}

		const presentReview = await RatingAndRaview.findOne({ _id: reviewId })
		
		const newReview = review ? review : presentReview.review;
		const newRating = rating ? rating : presentReview.rating;

		const result = await RatingAndRaview.updateOne(
			{ _id: reviewId },
			{ rating:newRating, review:newReview },
			{ new: true },
		);

		console.log(result);

		if (!result) {
			return res.status(400).json({
				success: false,
				message: "No review found",
			});
		}

		res.status(200).json({
			message: "Review updated successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

exports.deleteReview = async (req, res) => {
	try {
		const { reviewId } = req.params;

		const result = await RatingAndRaview.findOneAndDelete({
			_id: reviewId,
		});

		if (!result) {
			return res.status(400).json({
				message: "Review not found",
			});
		}

		await Course.updateOne(
			{ ratingAndReviews: reviewId },
			{ $pull: { ratingAndReviews: reviewId } },
		);

		res.status(200).json({
			message: "Review deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};
