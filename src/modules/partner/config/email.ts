import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import endpoints from '../../../config/endpoints.config';

const transporter = nodemailer.createTransport({
  host: 'smtpi.kinghost.net',
  port: 465,
  secure: true,
  auth: {
    user: endpoints.partnerMailUserName,
    pass: endpoints.partnerMailPassword,
  },
} as SMTPTransport.Options);

export default transporter;
