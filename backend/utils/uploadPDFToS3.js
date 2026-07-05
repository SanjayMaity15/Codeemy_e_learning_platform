const fs = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");

exports.uploadPDFToS3 = async (filePath, fileName) => {
	const file = fs.readFileSync(filePath);

	await s3.send(
		new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: `certificates/${fileName}`,
			Body: file,
			ContentType: "application/pdf",
		}),
	);

	return `certificates/${fileName}`;
};
