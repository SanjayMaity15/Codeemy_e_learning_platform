const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
	sectionName: {
		type: String,
		required: true,
	},

	subSection: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],

	// NEW FIELD
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Quiz",
		default: null,
	},
});

module.exports = mongoose.model("Section", sectionSchema);
