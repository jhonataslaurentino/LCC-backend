import * as dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: Number(process.env.PORT),
  bitrixBaseURL: String(process.env.BITRIX_URL),
  serverMode: String(process.env.NODE_ENV),
  databaseURL: String(process.env.DATABASE_URL),
  mailUserName: String(process.env.MAIL_USERNAME),
  mailPassword: String(process.env.MAIL_PASSWORD),
  mailOAuthClientID: String(process.env.OAUTH_CLIENTID),
  mailOAuthClientSecret: String(process.env.OAUTH_CLIENT_SECRET),
  mailOauthRefreshToken: String(process.env.OAUTH_REFRESH_TOKEN),
};
