const allowedKeywords = [
	"course",
	"courses",
	"lecture",
	"video",
	"lesson",
	"quiz",
	"question",
	"certificate",
	"dashboard",
	"profile",
	"instructor",
	"student",
	"login",
	"signup",
	"register",
	"password",
	"payment",
	"wishlist",
	"review",
	"rating",
	"purchase",
	"buy",
	"enroll",
	"progress",
	"section",
	"completion",
	"codeemy",
	"react",
	"nodejs",
	"js",
	"javascript",
	"java",
	"python"
];

exports.aiGuard = (req, res, next) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).json({
			success: false,
			message: "Message is required",
		});
	}

	const lowerMessage = message.toLowerCase();

	const allowed = allowedKeywords.some((keyword) =>
		lowerMessage.includes(keyword),
	);

	if (!allowed) {
		return res.status(200).json({
			success: true,
			reply: "I'm the Codeemy AI Assistant. I can only answer questions related to the Codeemy learning platform.",
		});
	}

	next();
};
