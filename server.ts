import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup Nodemailer
  let transporter: nodemailer.Transporter;
  
  // Initialize ethereal for testing if no real SMTP is provided
  nodemailer.createTestAccount().then((testAccount) => {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || testAccount.smtp.host,
      port: Number(process.env.SMTP_PORT) || testAccount.smtp.port,
      secure: process.env.SMTP_SECURE === 'true' || testAccount.smtp.secure,
      auth: {
        user: process.env.SMTP_USER || testAccount.user,
        pass: process.env.SMTP_PASS || testAccount.pass,
      },
    });
    console.log("Email transporter initialized. Using Ethereal for testing if no SMTP provided.");
  });

  // API routes FIRST
  app.post("/api/book", async (req, res) => {
    try {
      const { name, email, type, format, date, time, description } = req.body;
      
      if (!transporter) {
        return res.status(503).json({ error: "Email service not ready" });
      }

      let videoLinkHtml = '';
      let videoLinkText = '';
      
      if (format === 'Video Consultation') {
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const meetingLink = `https://meet.mawaddah.com/${uniqueId}`;
        
        videoLinkText = `\n\nYour secure video consultation link:\n${meetingLink}\n\nPlease join 5 minutes before your scheduled time.\n\n`;
        videoLinkHtml = `
          <div style="background-color: #E6F4EA; padding: 15px; border-radius: 8px; border: 1px solid #CEEAD6; margin: 20px 0; text-align: center;">
            <p style="margin-top: 0; color: #137333; font-weight: bold;">Your Video Consultation Link</p>
            <a href="${meetingLink}" style="display: inline-block; background-color: #137333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0;">Join Meeting</a>
            <p style="margin-bottom: 0; font-size: 12px; color: #137333;">Please join 5 minutes before your scheduled time.</p>
            <p style="margin-bottom: 0; font-size: 10px; color: #137333; word-break: break-all;"><a href="${meetingLink}" style="color: #137333;">${meetingLink}</a></p>
          </div>
        `;
      }

      const info = await transporter.sendMail({
        from: '"Mawaddah Consultancy" <noreply@mawaddah.com>',
        to: email,
        subject: "Booking Confirmation - Mawaddah Consultancy",
        text: `As-salamu alaykum ${name},\n\nJazakAllah khair for booking a consultation with Mawaddah.\n\nHere are your appointment details:\n- Type: ${type}\n- Format: ${format}\n- Date: ${date}\n- Time: ${time}\n- Details: ${description}\n\n${videoLinkText}May Allah bless your efforts.\n\nWassalam,\nMawaddah Team`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2C3E2D;">
            <h2 style="color: #C5A880;">Booking Confirmation</h2>
            <p>As-salamu alaykum <strong>${name}</strong>,</p>
            <p>JazakAllah khair for booking a consultation with Mawaddah.</p>
            <div style="background-color: #FDFBF7; padding: 20px; border-radius: 8px; border: 1px solid #E6D5B8; margin: 20px 0;">
              <h3 style="margin-top: 0;">Appointment Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 8px;"><strong>Type:</strong> ${type}</li>
                <li style="margin-bottom: 8px;"><strong>Format:</strong> ${format}</li>
                <li style="margin-bottom: 8px;"><strong>Date:</strong> ${date}</li>
                <li style="margin-bottom: 8px;"><strong>Time:</strong> ${time}</li>
                ${description ? `<li style="margin-bottom: 8px;"><strong>Details:</strong> ${description}</li>` : ''}
              </ul>
            </div>
            ${videoLinkHtml}
            <p>May Allah bless your efforts.</p>
            <p>Wassalam,<br><strong>Mawaddah Team</strong></p>
          </div>
        `
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Email sent! Preview URL: %s", previewUrl);

      res.json({ success: true, previewUrl });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send confirmation email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
