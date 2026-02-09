import "dotenv/config";

export const env = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',

  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/backendTwo',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  passwordReset: {
    secret: process.env.PASSWORD_RESET_SECRET,
    expiresIn: process.env.PASSWORD_RESET_EXPIRES_IN || '1h'
  },

  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    port: process.env.EMAIL_PORT || 3000
  },

  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  cookieSecret: process.env.COOKIE_SECRET
};