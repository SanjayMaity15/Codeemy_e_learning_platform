const express = require("express");

const router = express.Router();

// const { auth } = require("../middleware/auth");
const { chatWithAI } = require("../controllers/chatbot");
const { aiGuard } = require("../middlewares/aiGuard");

router.post("/chat", aiGuard, chatWithAI);

module.exports = router;
