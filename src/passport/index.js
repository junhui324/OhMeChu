import passport from 'passport';
import { jwt } from './strategies/jwt-strategy.js';

export const usePassport = () => {
  passport.use(jwt);
};
