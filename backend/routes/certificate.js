const express = require("express");
const router = express.Router();

const { verifyCertificate } = require("../controllers/Certificate");

router.get("/:certificateId", verifyCertificate);

module.exports = router;
