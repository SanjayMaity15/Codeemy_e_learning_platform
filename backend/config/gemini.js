const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBfxiqnFhrYc9OVDn4x0XJhJN4Z_H_EUqg");

const model = genAI.getGenerativeModel({
	model: "gemini-2.5-flash-lite",
});
module.exports = model;
