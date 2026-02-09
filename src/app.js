import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './config/passport.config.js';
import { env } from './config/env.config.js';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.cookieSecret)); // Cookies firmadas

// Passport
app.use(passport.initialize());

// Rutas
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Ruta no encontrada'
  });
});

export default app;