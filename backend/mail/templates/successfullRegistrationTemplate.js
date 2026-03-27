exports.registrationSuccessTemplate = (name) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin:0; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:26px;">Welcome to Codeemy!</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Congratulations! 🎉 <br>
          Your email has been successfully verified and your <strong>Codeemy</strong> account is now active.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          You can now:
        </p>

        <ul style="font-size:15px; color:#555; line-height:1.6; padding-left:20px;">
          <li>Access free and premium courses</li>
          <li>Track your learning progress</li>
          <li>Download course resources</li>
          <li>Get certificates after completion</li>
        </ul>

        <div style="text-align:center; margin:30px 0;">
          <a href="https://localhost:5173/login"
            style="background:#4f46e5; padding:12px 25px; color:white; text-decoration:none; border-radius:5px; font-size:16px;">
            Start Learning
          </a>
        </div>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          If you have any questions, feel free to reply to this email — we're here to help!
        </p>

        <p style="font-size:15px; color:#555; margin-top:30px;">
          Cheers,<br>
          <strong>Codeemy Team</strong>
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
