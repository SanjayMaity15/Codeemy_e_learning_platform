const express = require("express");
const router = express.Router();

const {createContact, getContacts} = require("../controllers/ContactController")

// POST /api/contact - create a new message
router.post("/contact-us", createContact);

// GET /api/contact - get all messages (optional)
router.get("/getContacts", getContacts);

module.exports = router;
