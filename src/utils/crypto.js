import bcrypt from 'bcrypt';
import { env } from '../config/env.config.js';

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, env.bcryptSaltRounds);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};