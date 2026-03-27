const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, subject, htmlBody) => {
	try {
		const data = await resend.emails.send({
			from: "Codeemy <codeemy@sanjaymaity.online>",
			to: [email],
			subject: subject,
			html: htmlBody,
		});

		return data; 
	} catch (error) {
		console.log("Email error:", error.message);
		throw error; 
	}
};

module.exports = mailSender;