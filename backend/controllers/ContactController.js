const { contactSubmitted } = require("../mail/templates/contactSuccess");
const Contact = require("../models/Contact");
const mailSender = require("../utils/mailSender");

// Create a new contact message
exports.createContact = async (req, res) => {
	try {
		const { name, email, phone, message } = req.body;

		// Validation
		if (!name || !email || !phone || !message) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}

		const contact = new Contact({ name, email, phone, message });
		await contact.save();

		// Send notification email to user

		try {
			const emailResponse = await mailSender(
				email,
				"Contact form submitted Successfully",
				contactSubmitted(
					name, email
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
        

		res.status(201).json({
			message: "Message sent successfully!",
			contact,
		});
	} catch (error) {
		console.error("Contact creation error:", error);
		res.status(500).json({
			message: "Server error. Please try again later.",
		});
	}
};

// Get all contact messages (optional admin endpoint)
exports.getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find().sort({ createdAt: -1 });
		res.status(200).json({data: contacts});
	} catch (error) {
		console.error("Get contacts error:", error);
		res.status(500).json({
			message: "Server error. Please try again later.",
		});
	}
};


