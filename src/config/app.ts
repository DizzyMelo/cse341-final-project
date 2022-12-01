import dotenv from 'dotenv';
import path from 'path';

// Make environment variables available in application
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default {
  port: process.env.PORT || '3000',
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.SECRET || '',
  redirectUrl: process.env.REDIRECT_URL || '',
  authorizationHost: process.env.AUTHORIZATION_HOST || '',
  baseUrl: process.env.BASE_URL || '',
};