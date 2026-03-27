exports.studentAccountDeleted = (name, email) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#ef4444; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Account Removed ⚠️</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          We would like to inform you that your student account associated with
          <strong>${email}</strong> has been <strong>deleted by the admin</strong>.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          As a result, you will no longer be able to access your account, enrolled courses,
          or any related data on our platform.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          If you believe this action was taken by mistake or have any questions, please feel free
          to contact our support team.
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Regards,<br>
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
