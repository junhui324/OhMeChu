import passport from 'passport';
import { local } from './strategies/local-strategy.js';
import { jwt } from './strategies/jwt-strategy.js';

export const usePassport = () => {
  passport.use(local);
  passport.use(jwt);
};
