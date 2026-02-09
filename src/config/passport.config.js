import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userRepository } from '../repository/user.repository.js';
import { env } from './env.config.js';

const cookieExtractor = (req) => {
  if (!req || !req.signedCookies) return null;
  return req.signedCookies.token || null;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: env.jwt.secret
};

passport.use('current', new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userRepository.getById(payload.id);
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

export default passport;