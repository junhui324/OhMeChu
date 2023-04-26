import passport from 'passport';
import authServices from './auth-service.js';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const statusCode = {
  unauthorized: 401,
};

const authMiddlewares = {
  //로그인 인증여부 확인하는 미들웨어 -> 관리자 또는 유저만 접근 가능한 곳에 적용
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
      const accessToken = authServices.issueAccessJWT(user);
      res.cookie('accessToken', accessToken);
      // return res.json({
      //   err: null,
      //   data: accessToken,
      // });
      return next();
    })(req, res, next);
  },

  //로그인 유저 전용 페이지에 접근할 경우, 필요한 토큰 인증
  isVarifiedAccessToken: (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    const secret = process.env.SECRET_KEY;
    if (!accessToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decoded = jwt.verify(accessToken, secret);
      req.el = decoded.el;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.2' });
    }
  },

  //refressToken 유효성 검사 API
  isVarifiedRefreshToken: (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const secret = process.env.SECRET_KEY;
    if (!refreshToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decoded = jwt.verify(refreshToken, secret);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
  },

  //새로운 accessToken 발급 API
  issueNewAccessToken: (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
      if (err)
        return res.status(403).json({ message: '인증되지 않은 토큰입니다.' });
      const accessToken = issueAccessJWT(user);
      res.json({ accessToken });
      next();
    });
  },
};

export { authMiddlewares };
