exports.instructorDeactivated = (name) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#dc2626; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">Account Deactivated ⚠️</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          We regret to inform you that your instructor account has been <strong>deactivated</strong> by our admin team.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          As a result, you will no longer be able to access instructor features, create new courses, or manage existing content.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6; background:#fef2f2; padding:12px; border-left:4px solid #dc2626; border-radius:6px;">
          ⚠️ <strong>Note:</strong> If you believe this action was taken in error, please contact our support team for assistance.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          We're here to help resolve any issues or provide clarification.
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Regards,<br>
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
