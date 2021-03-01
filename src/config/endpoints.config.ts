import * as dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: Number(process.env.NODE_PORT),
  bitrixBaseURL: String(process.env.BITRIX_URL),
};
