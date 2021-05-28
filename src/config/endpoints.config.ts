import * as dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: Number(process.env.PORT),
  bitrixBaseURL: String(process.env.BITRIX_URL),
  bitrixAvatarFolderID: Number(process.env.PROFILE_AVATAR_FOLDER_ID),
  serverMode: String(process.env.NODE_ENV),
  databaseURL: String(process.env.DATABASE_URL),
  mailUserName: String(process.env.MAIL_USERNAME),
  mailPassword: String(process.env.MAIL_PASSWORD),
  frontendURL: String(process.env.FRONTEND_URL),
  administratorsEmails: String(process.env.ADMINISTRATORS).split(' '),
  eduzzApiKey: String(process.env.EDUZZ_API_KEY),
};
