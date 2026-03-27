const { default: mongoose } = require("mongoose");
const { instructorApproved } = require("../mail/templates/instructorApproveed");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndRaview");
const CourseProgress = require("../models/CourseProgress");
const Payment = require("../models/Payment");
const {
	studentAccountDeleted,
} = require("../mail/templates/deleteStudentMail");
const OTP = require("../models/OTP");

exports.getPaymentsData = async (req, res) => {
	try {
		const payments = await Payment.find({});

		if (payments.length === 0) {
			return res.status(404).json({ message: "No payment data" });
		}

		return res.status(200).json({
			data: payments,
			message: "Payment fetch successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "server error",
		});
	}
};

exports.getAllInstructorData = async (req, res) => {
	try {
		const allInstructor = await User.find({
			accountType: "Instructor",
		}).select("-password");

		if (allInstructor.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No instructor available",
			});
		}

		return res.status(200).json({
			success: true,
			data: allInstructor,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

exports.getAllStudentData = async (req, res) => {
	try {
		const allStudent = await User.find({ accountType: "Student" }).select(
			"-password",
		);

		if (allStudent.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No student available",
			});
		}

		return res.status(200).json({
			success: true,
			data: allStudent,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

exports.approvedInstructor = async (req, res) => {
	try {
		const { insId } = req.body;

		if (!insId) {
			return res.status(400).json({
				message: "Required field not present",
			});
		}

		const instructor = await User.findOneAndUpdate(
			{ _id: insId },
			{ approved: true },
			{ new: true },
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				instructor.email,
				"Account verification successfull",
				instructorApproved(
					`${instructor.firstName} ${instructor.lastName}`,
				),
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		return res.status(200).json({
			message: "Instructor verified successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Server error",
		});
	}
};

exports.deleteStudentByAdmin = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { userId } = req.params;
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

		// 5. Delete User
		await User.findByIdAndDelete(userId, { session });

		await OTP.deleteMany({ email: user.email }, { session });

		// Commit Transaction
		await session.commitTransaction();
		session.endSession();

		// Send notification email
		try {
			const emailResponse = await mailSender(
				user.email,
				"Account deleted",
				studentAccountDeleted(
					`${user.firstName} ${user.lastName}`,
					user.email,
				),
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		return res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);

		// Rollback everything
		await session.abortTransaction();
		session.endSession();

		return res.status(500).json({
			success: false,
			message: "User deletion failed",
			error: error.message,
		});
	}
};

exports.popularCourses = async (req, res) => {
	try {
		const courses = await Course.find({})
			.populate("instructor", "firstName lastName") 
			.populate("ratingAndReviews", "rating")
			.select(
				"courseName whatYouWillLearn price thumbnail instructor ratingAndReviews",
			);

		const topCourses = courses
			.map((course) => {
				const avgRating =
					course.ratingAndReviews.length > 0
						? course.ratingAndReviews.reduce(
								(sum, r) => sum + r.rating,
								0,
							) / course.ratingAndReviews.length
						: 0;
				return { ...course.toObject(), avgRating };
			})
			.sort((a, b) => b.avgRating - a.avgRating)
			.slice(0, 3);

		console.log(topCourses);

		return res.status(200).json({
			data: topCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Courses fetching error",
		});
	}
};
