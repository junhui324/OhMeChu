import passport from 'passport';

const authMiddleware = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/api/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.session);
      return res.redirect('/api');
    });
  })(req, res, next);
};

export { authMiddleware };
