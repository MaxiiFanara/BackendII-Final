import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (error) {
    return null;
  }
};

// Para tokens de recuperación de contraseña (expiran en 1h según consigna)
export const generatePasswordResetToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, env.passwordReset.secret, { 
    expiresIn: env.passwordReset.expiresIn 
  });
};

export const verifyPasswordResetToken = (token) => {
  try {
    return jwt.verify(token, env.passwordReset.secret);
  } catch (error) {
    return null;
  }
};