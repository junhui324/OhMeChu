import passport from 'passport';
import {local} from './strategies/passport-strategy';

export const usePassport = () => passport.use(local);
