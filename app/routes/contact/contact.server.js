import { json } from '@remix-run/node';
import nodemailer from 'nodemailer';

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ request }) {
  const env = process.env;

  const {
    SMTP_HOST,
    SMTP_PORT = 587,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_SENDER,
    EMAIL_RECIPIENT = 'dushyantsom60@gmail.com',
  } = env;

  const formData = await request.formData();
  const email = String(formData.get('email'));
  const message = String(formData.get('message'));
  const name = String(formData.get('name'));

  if (name) {
    return json({ success: true });
  }

  const errors = {};

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${email}" <${EMAIL_SENDER || SMTP_USER}>`,
      to: EMAIL_RECIPIENT,
      subject: `New Portfolio Message from ${email}`,
      text: `From: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return json({ success: true });
  } catch (error) {
    console.error('Failed to send SMTP email:', error);
    return json({
      errors: {
        message: 'Could not send message. Please ensure SMTP credentials are configured correctly.',
      },
    });
  }
}
