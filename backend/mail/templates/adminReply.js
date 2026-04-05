exports.adminReply = (name, email, message) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#10b981; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Response to Your Query 💬</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Thank you for reaching out to us earlier. Our support team has reviewed your message sent from 
          <strong>${email}</strong>.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Here is our response to your query:
        </p>

        <!-- ADMIN MESSAGE BOX -->
        <div style="background:#f9fafb; border-left:4px solid #10b981; padding:15px; margin:20px 0; border-radius:6px;">
          <p style="margin:0; font-size:14px; color:#333;">
            ${message}
          </p>
        </div>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          If you have any further questions or need additional assistance, feel free to reply to this email. We're always happy to help!
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Best regards,<br>
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
