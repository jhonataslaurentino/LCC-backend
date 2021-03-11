import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import endpoints from './endpoints.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: endpoints.mailUserName,
    pass: endpoints.mailPassword,
  },
} as SMTPTransport.Options);
export default transporter;
