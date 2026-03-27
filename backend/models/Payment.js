const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	amount: Number,
	paymentId: String, // Razorpay / Stripe
	orderId: String,
	status: {
		type: String,
		enum: ["pending", "completed", "failed"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Payment", paymentSchema);
