import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import endpoints from './endpoints.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: endpoints.mailUserName,
    pass: endpoints.mailPassword,
    clientId: endpoints.mailOAuthClientID,
    clientSecret: endpoints.mailOAuthClientSecret,
    refreshToken: endpoints.mailOauthRefreshToken,
  },
} as SMTPTransport.Options);
export default transporter;
