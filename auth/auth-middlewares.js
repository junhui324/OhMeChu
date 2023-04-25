import passport from 'passport';
import authServices from './auth-service.js';

const statusCode = {
  unauthorized: 401,
};

const authMiddlewares = {
  //로그인 인증 미들웨어
  isLoginSucceed: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, errInfo) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(statusCode.unauthorized)
          .json({ message: '로그인 인증 실패' });
      }
      // const userInfo = req.user;
      const token = authServices.issueJWT(user);
      res.cookie('token', token);
      return res.json({
        err: null,
        data: token,
      });
    })(req, res, next);
  },

  //로그인 유저 전용 페이지에 접근할 경우, 필요한 토큰 인증
  /*
  isVarifiedToken: (req, res, next) => {
    const token = req.cookies.token;
    const secret = process.env.SECRET_KEY;
    if (!token) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ message: '잘못된 토큰입니다.' });
    }
  },
  */
};

export { authMiddlewares };
