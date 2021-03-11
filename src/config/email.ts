import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';
import endpoints from './endpoints.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: endpoints.mailUserName,
    pass: endpoints.mailPassword,
  },
} as SMTPTransport.Options);
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', 'emails', 'views'),
      partialsDir: path.resolve(__dirname, '..', 'emails', 'views', 'partials'),
    },
    extName: '.hbs',
    viewPath: path.resolve(__dirname, '..', 'emails', 'views'),
  }),
);

export default transporter;
