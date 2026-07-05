const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = ({
	certificateId,
	studentName,
	courseName,
	instructorName,
	averageScore,
}) => {
	return new Promise((resolve, reject) => {
		const formattedDate = new Date().toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		const folderPath = path.join(__dirname, "../certificates");

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}

		const fileName = `${studentName}-${certificateId}-certificate.pdf`;
		const filePath = path.join(folderPath, fileName);

		const doc = new PDFDocument({
			size: "A4",
			layout: "landscape",
			margin: 50,
		});

		const stream = fs.createWriteStream(filePath);

		doc.pipe(stream);

		//--------------------------------------------------
		// Background
		//--------------------------------------------------
		doc.rect(0, 0, doc.page.width, doc.page.height).fill("#FFFFF0");

		//--------------------------------------------------
		// Border
		//--------------------------------------------------
		doc.lineWidth(8)
			.strokeColor("#1E3A8A")
			.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
			.stroke();

		//--------------------------------------------------
		// Title
		//--------------------------------------------------

		const logoPath = path.join(__dirname, "../assets/logo.png");

		doc.image(logoPath, doc.page.width / 2 - 50, 40, {
			width: 100,
			height: 100,
		});

		doc.y = 150;

		doc.fillColor("#1E3A8A")
			.fontSize(34)
			.font("Helvetica-Bold")
			.text("CERTIFICATE OF COMPLETION", {
				align: "center",
			});

		doc.moveDown(0.3);

		doc.fontSize(18)
			.fillColor("black")
			.font("Helvetica")
			.text("This Certificate is proudly presented to", {
				align: "center",
			});

		doc.moveDown(0.3);

		//--------------------------------------------------
		// Student Name
		//--------------------------------------------------
		doc.fontSize(32)
			.fillColor("#5c0ebb")
			.font("Helvetica-Bold")
			.text(studentName, {
				align: "center",
			});

		doc.moveDown(0.3);

		doc.fontSize(18)
			.fillColor("black")
			.font("Helvetica")
			.text("for successfully completing", {
				align: "center",
			});

		doc.moveDown(0.3);

		//--------------------------------------------------
		// Course Name
		//--------------------------------------------------
		doc.fontSize(20)
			.font("Helvetica-Bold")
			.fillColor("#a10046")
			.text(courseName, {
				align: "center",
			});

		doc.moveDown(0.3);

		doc.fontSize(12)
			.fillColor("#374151")
			.text(`Date of Issue: ${formattedDate}`, {
				align: "center",
			});
		doc.moveDown();

		doc.fontSize(18)
			.font("Helvetica")
			.text(`Score : ${averageScore.toFixed(2)}%`, {
				align: "center",
			});

		doc.moveDown(2);

		//--------------------------------------------------
		// Footer
		//--------------------------------------------------
		const bottomY = 470;

		doc.fontSize(15)
			.font("Helvetica-Bold")
			.fillColor("#a10046")
			.text("Instructor", 132, bottomY - 25);

		doc.moveTo(80, bottomY - 5)
			.lineTo(250, bottomY - 5)
			.stroke();

		doc.fontSize(16)
			.font("Helvetica")
			.fillColor("#072121")
			.text(instructorName, 115, bottomY + 5);

		// ================= RIGHT SIDE =================
		doc.fontSize(15)
			.font("Helvetica-Bold")
			.fillColor("#a10046")
			.text("Certificate ID", 600, bottomY - 25);

		doc.moveTo(530, bottomY - 5)
			.lineTo(760, bottomY - 5)
			.stroke();

		doc.fontSize(15)
			.font("Helvetica")
			.fillColor("#072121")
			.text(certificateId, 532, bottomY + 5);

		// Certificate Verification URL
		// Certificate Verification URL
		const certificateUrl = `http://localhost:8000/certificates/${certificateId}`;

		const urlWidth = 400;
		const urlX = (doc.page.width - urlWidth) / 2;
		const urlY = bottomY + 45;

		doc.fontSize(10)
			.fillColor("#1E3A8A")
			.text("Verify Certificate:", urlX, urlY, {
				width: urlWidth,
				align: "center",
			});

		doc.moveDown(0.2);

		doc.fontSize(10).fillColor("blue").text(certificateUrl, {
			width: urlWidth,
			align: "center",
			underline: true,
			link: certificateUrl,
		});
		doc.end();

		stream.on("finish", () => {
			resolve(filePath);
		});

		stream.on("error", (err) => {
			reject(err);
		});
	});
};

module.exports = generateCertificate;
