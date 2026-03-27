exports.passwordResetSuccessTemplate = (name, email) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Password Reset Successful</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Your password for the account associated with <strong>${email}</strong> has been successfully reset. 🎉
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          You can now log in using your new password. If you did not perform this action, please contact our support immediately to secure your account.
        </p>

        <div style="text-align:center; margin:30px 0;">
          <a href="https://localhost:5173/login"
             style="background:#4f46e5; padding:12px 25px; color:white; text-decoration:none; border-radius:5px; font-size:16px;">
             Login Now
          </a>
        </div>

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
