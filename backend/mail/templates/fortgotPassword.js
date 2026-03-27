exports.forgotPasswordTemplate = (name, resetLink) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Reset Your Password</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          We received a request to reset your password for your Codeemy account.
        </p>

        <p style="text-align:center; margin:30px 0;">
          <a href="${resetLink}" 
             style="background:#4f46e5; padding:12px 25px; color:white; text-decoration:none; border-radius:5px; font-size:16px;">
             Reset Password
          </a>
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          For security, this link will expire in 1 hour.
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
