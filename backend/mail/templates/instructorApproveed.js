exports.instructorApproved = (name) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#16a34a; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">You're Approved! 🚀</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Great news! Your instructor account has been <strong>approved</strong> by our admin team.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          You can now log in to your dashboard and start creating, managing, and publishing your
          courses.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6; background:#f0fdf4; padding:12px; border-left:4px solid #16a34a; border-radius:6px;">
          🔔 <strong>Important:</strong> If you are currently logged in, please <strong>log out and log in again</strong>
          to refresh your account and access instructor features.
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          We’re excited to have you onboard and can’t wait to see the amazing content you create!
        </p>

        <p style="font-size:15px; color:#555; margin-top:20px;">
          Best wishes,<br>
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
