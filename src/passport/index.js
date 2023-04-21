import passport from 'passport';
import { local } from './strategies/local-strategy';

export const usePassport = () => passport.use(local);
