exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
	return `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding:40px 0;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.1);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:25px; text-align:center; color:white;">
        <h2 style="margin:0; font-size:24px;">💳 Payment Successful</h2>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <p style="font-size:16px; color:#333;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Your payment has been successfully processed. 🎉
        </p>

        <!-- PAYMENT CARD -->
        <div style="margin:20px 0; padding:18px; background:#eef2ff; border-left:4px solid #4f46e5; border-radius:6px; text-align:left;">
          
          <p style="margin:6px 0; font-size:15px;">
            <strong>Amount Paid:</strong> ₹${amount}
          </p>

          <p style="margin:6px 0; font-size:15px;">
            <strong>Payment ID:</strong> ${paymentId}
          </p>

          <p style="margin:6px 0; font-size:15px;">
            <strong>Order ID:</strong> ${orderId}
          </p>

        </div>

        <!-- CTA -->
        <div style="text-align:center; margin-top:25px;">
          <a href="http://localhost:5173/dashboard/enrolled-courses"
            style="display:inline-block; padding:12px 24px; background:#4f46e5; color:white; text-decoration:none; border-radius:6px; font-size:14px; font-weight:bold;">
            View Your Courses
          </a>
        </div>

        <p style="font-size:15px; color:#555; margin-top:25px;">
          Thank you for choosing us ❤️<br>
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
    