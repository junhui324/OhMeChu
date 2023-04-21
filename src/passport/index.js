import passport from 'passport';
import { local } from './strategies/local-strategy';
import { Users } from '../db/model/index.js';

/*
passport.serializeUser(function(user, done) {             
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {             
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
*/
export const usePassport = () => passport.use(local);

/*
export const usePassport = () => {
  passport.use(local);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Users.findOne({ user_id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
*/
