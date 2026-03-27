exports.contactSubmitted = (name, email) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Feedback Received Successfully 📩</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Thank you for reaching out to us! We’ve successfully received your message sent from
          <strong>${email}</strong>.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Our team will review your query and get back to you as soon as possible. We truly
          appreciate your interest and patience.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          If your message is urgent, feel free to reply to this email or visit our website for more
          support options.
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Warm regards,<br>
          <strong>Codeemy Support Team</strong>
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#efefef; padding:15px; text-align:center; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} Codeemy. All rights reserved.
      </div>

    </div>
  </div>
  `;
};
