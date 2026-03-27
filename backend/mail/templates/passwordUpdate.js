exports.passwordUpdated = (name, email) => {
	return ` <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Password Changed Successfully</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Your password associated with <strong>${email}</strong> was changed successfully. 🎉
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          If you did not make this change, please <a href="https://localhost:5173/change-password" style="color:#4f46e5;">reset your password immediately</a> to secure your account.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          For your security, we recommend choosing a strong, unique password and not sharing it with anyone.
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Cheers,<br>
          <strong>Codeemy Team</strong>
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#efefef; padding:15px; text-align:center; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} Codeemy. All rights reserved.
      </div>

    </div>
  </div>`;
};
