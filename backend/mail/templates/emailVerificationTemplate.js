const otpTemplate = (otp) => {
	return `  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
    <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background: #4f46e5; padding: 20px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px;">Verify Your Email</h2>
      </div>

      <!-- BODY -->
      <div style="padding: 25px;">
        <p style="font-size: 16px; color: #333;">Hi, <b>Dear</b>,</p>
        
        <p style="font-size: 15px; color: #555;">
          Thank you for signing up on <strong>Codeemy</strong>!  
          To complete your registration, please use the OTP below to verify your email address.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #4f46e5;">${otp}</h1>
        </div>

        <p style="font-size: 15px; color: #555;">
          This OTP is valid for the next <strong>5 minutes</strong>.  
          If you did not request this code, please ignore this email.
        </p>

        <p style="font-size: 15px; color: #555; margin-top: 30px;">
          Best regards,<br />
          <strong>Codeemy Team</strong>
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background: #f0f0f0; padding: 15px; text-align: center; color: #777; font-size: 12px;">
        © ${new Date().getFullYear()} Codeemy. All rights reserved.
      </div>

    </div>
  </div>`;
};
module.exports = otpTemplate;
