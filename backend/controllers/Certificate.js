const { GetObjectCommand } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require("../config/s3");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const QuizResult = require("../models/QuizResult");
const Certificate = require("../models/Certificate");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const generateCertificate = require("../utils/generateCertificate");
const { uploadPDFToS3 } = require("../utils/uploadPDFToS3");

exports.generateCertificate = async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.id;

		if (!courseId) {
			return res.status(400).json({
				success: false,
				message: "Course ID is required",
			});
		}

		const course = await Course.findById(courseId)
			.populate("instructor")
			.populate({
				path: "courseContent",
				populate: [
					{
						path: "subSection",
					},
					{
						path: "quiz",
					},
				],
			});
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		if (!course.isCompletedByInstructor) {
			return res.status(400).json({
				success: false,
				message: "Instructor has not completed this course yet.",
			});
		}
		const existingCertificate = await Certificate.findOne({
			course: courseId,
			student: userId,
		});

		if (existingCertificate) {
			return res.status(200).json({
				success: true,
				message: "Certificate already exists",
				data: existingCertificate,
			});
		}
		const progress = await CourseProgress.findOne({
			courseID: courseId,
			userId,
		});
		let totalVideos = 0;

		course.courseContent.forEach((section) => {
			totalVideos += section.subSection.length;
		});
		if (!progress || progress.completedVideos.length < totalVideos) {
			return res.status(400).json({
				success: false,
				message: "Complete all videos first.",
			});
		}

		const quizResults = await QuizResult.find({
			user: userId,
			course: courseId,
		}).populate("quiz");

		const totalQuizzes = course.courseContent.filter(
			(section) => section.quiz,
		).length;

		if (totalQuizzes === 0) {
			return res.status(400).json({
				success: false,
				message: "No quizzes found for this course.",
			});
		}

		if (quizResults.length !== totalQuizzes) {
			return res.status(400).json({
				success: false,
				message: "Complete every section quiz first.",
			});
		}

		let totalPercentage = 0;

		quizResults.forEach((result) => {
			const percentage =
				result.totalMarks > 0
					? (result.score / result.totalMarks) * 100
					: 0;

			totalPercentage += percentage;
		});

		const averageScore = totalPercentage / quizResults.length;

		if (averageScore < 60) {
			return res.status(400).json({
				success: false,
				message: "Average quiz score must be at least 60%.",
			});
		}

		const certificateId = `CODEEMY-${new Date().getFullYear()}-${Date.now()}`;

		const certificate = await Certificate.create({
			course: courseId,
			student: userId,
			instructor: course.instructor,
			averageScore,
			certificateId,
		});

		const userDetails = await User.findById(req.user.id).select(
			"firstName lastName",
		);
		console.log({ userDetails });
		const pdfPath = await generateCertificate({
			certificateId,
			studentName: userDetails.firstName + " " + userDetails.lastName,
			courseName: course.courseName,
			instructorName:
				course.instructor.firstName + " " + course.instructor.lastName,
			averageScore,
		});

		const key = await uploadPDFToS3(
			pdfPath,
			`${userDetails.firstName}-${userDetails.lastName}-${Date.now()}.pdf`,
		);

		// store ONLY the S3 key
		certificate.pdfUrl = key;

		await certificate.save();

		const fs = require("fs");

		fs.unlinkSync(pdfPath);

		return res.status(200).json({
			success: true,
			message: "Certificate generated successfully",
			data: certificate,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.downloadCertificate = async (req, res) => {
	console.log(req.params.certificateId);
	const certificate = await Certificate.findOne({
		_id: req.params.certificateId,
		student: req.user.id,
	});

	if (!certificate) {
		return res.status(404).json({
			success: false,
			message: "Certificate not found",
		});
	}

	console.log({ certificate });
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: certificate.pdfUrl,
	});

	const url = await getSignedUrl(s3, command, {
		expiresIn: 300,
	});

	res.json({
		success: true,
		url,
	});
};



exports.verifyCertificate = async (req, res) => {
	try {
		const { certificateId } = req.params;

		if (!certificateId) {
			return res.status(400).json({
				success: false,
				message: "Certificate ID is required.",
			});
		}

		const certificate = await Certificate.findOne({ certificateId })
			.populate("student", "firstName lastName email")
			.populate("course", "courseName")
			.populate("instructor", "firstName lastName");

		if (!certificate) {
			return res.status(404).json({
				success: false,
				message: "Certificate not found or is invalid.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Certificate verified successfully.",
			certificate: {
				certificateId: certificate.certificateId,
				studentName: `${certificate.student.firstName} ${certificate.student.lastName}`,
				courseName: certificate.course.courseName,
				instructorName: `${certificate.instructor.firstName} ${certificate.instructor.lastName}`,
				averageScore: certificate.averageScore,
				issuedAt: certificate.issuedAt,
				pdfUrl: certificate.pdfUrl,
			},
		});
	} catch (error) {
		console.error("Verify Certificate Error:", error);

		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

