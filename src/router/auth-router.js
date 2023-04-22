import { Router } from 'express';
import passport from 'passport';
const authRouter = Router();

authRouter.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('/');
  }
);

export { authRouter };
