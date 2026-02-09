import { verifyToken } from '../utils/jwt.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.signedCookies.token;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        error: 'No estás autenticado. Por favor inicia sesión.'
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        error: 'Token inválido o expirado'
      });
    }

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error: 'Error de autenticación'
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      error: 'No estás autenticado. Por favor inicia sesión.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      error: 'No tienes permisos para realizar esta acción'
    });
  }

  next();
};
export const isUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      error: 'No estás autenticado. Por favor inicia sesión.'
    });
  }

  if (req.user.role !== 'user') {
    return res.status(403).json({
      status: 'error',
      error: 'Solo los usuarios pueden realizar esta acción'
    });
  }

  next();
};