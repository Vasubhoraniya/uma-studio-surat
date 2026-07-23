/* ============================================================
   api/send-enquiry.js — Vercel Serverless Function
   Handles POST /api/send-enquiry
   Sends email via Gmail SMTP using Nodemailer
   ============================================================ */

const nodemailer = require('nodemailer');

/* ── Allowed event types (must match frontend dropdown) ───── */
const ALLOWED_EVENT_TYPES = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Engagement',
  'Child Photoshoot',
  'Couple Portraits',
  'Family Portraits',
  'Fashion / Editorial',
  'Product Photography',
  'Studio Portrait',
  'Wedding Film',
  'Other'
];

/* ── Prevent HTML injection in email body ─────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ── Serverless handler ───────────────────────────────────── */
module.exports = async function handler(req, res) {

  /* Only accept POST requests */
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const { name, email, contactNumber, eventType, message } = req.body || {};

    /* ── Server-side validation ── */
    if (!name || !name.trim())
      return res.status(400).json({ success: false, message: 'Please provide your name.' });

    if (name.trim().length > 100)
      return res.status(400).json({ success: false, message: 'Name is too long.' });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });

    if (!contactNumber || !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(contactNumber.replace(/[\s-]/g, '')))
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit contact number.' });

    if (!eventType || !ALLOWED_EVENT_TYPES.includes(eventType))
      return res.status(400).json({ success: false, message: 'Please select a valid event type.' });

    if (!message || !message.trim())
      return res.status(400).json({ success: false, message: 'Please provide a message.' });

    if (message.trim().length > 2000)
      return res.status(400).json({ success: false, message: 'Message is too long (max 2000 characters).' });

    /* ── Sanitize for HTML email ── */
    const safeName      = escapeHtml(name.trim());
    const safeEmail     = escapeHtml(email.trim());
    const safePhone     = escapeHtml(contactNumber.trim());
    const safeEventType = escapeHtml(eventType.trim());
    const safeMessage   = escapeHtml(message.trim()).replace(/\n/g, '<br>');
    const submittedAt   = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    /* ── Gmail SMTP transporter ── */
    const transporter = nodemailer.createTransport({
      service : 'gmail',
      auth    : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_APP_PASSWORD
      }
    });

    /* ── Mail options ──
       FROM    : Website Enquiry <EMAIL_USER>     (studio Gmail)
       TO      : RECEIVER_EMAIL                   (owner inbox)
       REPLY-TO: visitor email                    (Reply → customer) */
    const mailOptions = {
      from    : `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to      : process.env.RECEIVER_EMAIL,
      replyTo : email.trim(),
      subject : `New Event Enquiry - ${eventType.trim()} - ${name.trim()}`,

      /* Plain text fallback */
      text: [
        'New Website Event Enquiry',
        '',
        `Name           : ${name.trim()}`,
        `Email ID       : ${email.trim()}`,
        `Contact Number : ${contactNumber.trim()}`,
        `Event Type     : ${eventType.trim()}`,
        '',
        'Message:',
        message.trim(),
        '',
        `Submitted At   : ${submittedAt} IST`
      ].join('\n'),

      /* Professional HTML email */
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Event Enquiry</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
    .header { background: #1a1a1a; padding: 32px; text-align: center; }
    .header h1 { color: #c9a96e; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; }
    .header p { color: #888; font-size: 13px; margin-top: 8px; }
    .body { padding: 32px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 18px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    td { padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; vertical-align: top; }
    td:first-child { color: #666; font-weight: 600; width: 140px; }
    td:last-child { color: #222; }
    .badge { display: inline-block; background: #c9a96e; color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }
    .msg-box { background: #fafafa; border-left: 4px solid #c9a96e; padding: 16px 20px; border-radius: 0 6px 6px 0; }
    .msg-box p { font-size: 14px; color: #333; line-height: 1.8; }
    .timestamp { text-align: right; font-size: 12px; color: #aaa; margin-top: 20px; }
    .footer { background: #f9f9f9; padding: 20px 32px; text-align: center; border-top: 1px solid #eee; }
    .footer p { font-size: 12px; color: #999; line-height: 1.8; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>UMA Photo Studio</h1>
      <p>New Website Event Enquiry</p>
    </div>
    <div class="body">
      <p class="label">Customer Details</p>
      <table>
        <tr><td>Name</td><td>${safeName}</td></tr>
        <tr><td>Email ID</td><td>${safeEmail}</td></tr>
        <tr><td>Contact Number</td><td>${safePhone}</td></tr>
        <tr><td>Event Type</td><td><span class="badge">${safeEventType}</span></td></tr>
      </table>
      <p class="label">Message</p>
      <div class="msg-box"><p>${safeMessage}</p></div>
      <p class="timestamp">Submitted At: ${submittedAt} IST</p>
    </div>
    <div class="footer">
      <p>Submitted via Uma Photo Studio website contact form.</p>
      <p>Click <strong>Reply</strong> to respond directly to the customer.</p>
    </div>
  </div>
</body>
</html>`
    };

    /* ── Send email ── */
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success : true,
      message : 'Your enquiry has been sent successfully.'
    });

  } catch (err) {
    /* Never expose internal error details to client */
    console.error('Email send error:', err.message);
    return res.status(500).json({
      success : false,
      message : 'Unable to send your enquiry. Please try again later.'
    });
  }
};
