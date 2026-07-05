const model = require("../config/gemini");
const systemPrompt = require("../prompt/systemPrompt");

exports.chatWithAI = async (req, res) => {
	try {
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({
				success: false,
				message: "Message is required",
			});
		}

		const prompt = `
            ${systemPrompt}

            User Question:
            ${message}
            `;

		const result = await model.generateContent(prompt);

		const reply = result.response.text();

		return res.status(200).json({
			success: true,
			reply,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};
