const express = require("express");
const router = express.Router();
const {
	auth,
	
	isAdmin,
} = require("../middlewares/auth");
const { getAllInstructorData, approvedInstructor, getAllStudentData, deleteStudentByAdmin, getPaymentsData, popularCourses } = require("../controllers/adminController");

router.get("/payment", auth, isAdmin, getPaymentsData);
router.get("/instructor", auth, isAdmin, getAllInstructorData);
router.get("/student", auth, isAdmin, getAllStudentData);
router.post("/approved", auth, isAdmin, approvedInstructor);
router.delete("/delete-student/:userId", auth, isAdmin, deleteStudentByAdmin);


// get top courses
router.get("/popular-courses", popularCourses)

module.exports = router;
