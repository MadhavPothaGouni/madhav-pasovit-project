const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

module.exports = async function sendOrderEmail(order, user) {
  try {
    const itemsHtml = order.items.map(it => `<p>${it.name} (${it.size}) x${it.qty} - ?${it.price}</p>`).join('');
    const html = `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Date: ${new Date(order.orderDate).toLocaleString()}</p>
      <h3>Items:</h3>
      ${itemsHtml}
      <h3>Total: ?${order.totalPrice}</h3>
      <p>We will notify you when your order ships.</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - #${order._id}`,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order email sent:', info.messageId);
  } catch (err) {
    console.error('Failed to send email', err);
    // do not throw — order already created; log and move on
  }
};
