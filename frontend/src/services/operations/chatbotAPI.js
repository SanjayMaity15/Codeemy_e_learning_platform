import axios from "axios";

export const chatWithAI = async (message) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}chatbot/chat`,
			{ message },
			{
				withCredentials: true,
			},
		);

		return response.data.reply;
	} catch (error) {
		console.log(error);
		return "Something went wrong.";
	}
};
