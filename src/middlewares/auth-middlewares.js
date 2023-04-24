import passport from 'passport';
import authServices from '../service/auth-service.js';

const statusCode = {
  unauthorized: 401,
};

const authMiddlewares = {
  isLoginSucceed: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, errInfo) => {
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
        // const token = authServices.issueJWT(user);
        return res.redirect('/api');
      });
    })(req, res, next);
  },

  isIssueSucceed: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, errInfo) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(statusCode.unauthorized)
          .json({ message: '인증 실패' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = authServices.issueJWT(user);
        res.cookie('token', token);
        return res.json({
          err: null,
          data: token,
        });
      });
    })(req, res, next);
  },
  /*
  logout: (req, res, next) => {
    try {
      req.session.destroy(() => {
        console.log('로그아웃 완료!');
        return res.redirect('/api');
      });
    } catch (err) {
      return next(err);
    }
  },
*/
};

export { authMiddlewares };
