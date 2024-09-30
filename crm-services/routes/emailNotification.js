const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Route for sending confirmation email
router.post('/api/send-confirmation', async (req, res) => {
  const { email, donations } = req.body;

  // Format the email content with donation details
  const donationSummary = `
    <h3>Thank you for your donations!</h3>
    <ul>
      <li>Environment: Rs. ${donations.environment || 0}</li>
      <li>Health: Rs. ${donations.health || 0}</li>
      <li>Education: Rs. ${donations.education || 0}</li>
      <li>Child Welfare: Rs. ${donations.childWelfare || 0}</li>
      <li>Animal Welfare: Rs. ${donations.animalWelfare || 0}</li>
      <li>Disability: Rs. ${donations.disability || 0}</li>
    </ul>
    <p>Total: Rs. ${Object.values(donations).reduce((acc, val) => acc + parseFloat(val || 0), 0)}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Donation Confirmation',
    html: donationSummary,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Confirmation email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
});

module.exports = router;
