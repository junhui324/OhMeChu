import passport from 'passport';
import { local } from './strategies/passport-strategy.js';

export const usePassport = () => {
  passport.use(local);
};
