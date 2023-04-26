import passport from 'passport';
import authServices from './auth-service.js';
import { RefreshToken } from '../src/db/model/index.js'; //refresh token 유효성 검사에 사용
import jwt from 'jsonwebtoken';
require('dotenv').config();

const authMiddlewares = {
  //로그인 인증여부 확인하는 미들웨어 -> 관리자 또는 유저만 접근 가능한 곳에 적용
  isLoginSucceed: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, errInfo) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: '로그인 인증 실패' });
      }
      // const userInfo = req.user;
      const accessToken = authServices.issueAccessJWT(user);
      res.cookie('accessToken', accessToken);
      return next();
    })(req, res, next);
  },

  //passport를 이용한 access 토큰 인증
  requireAuth: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
  


  //로그인 유저 전용 페이지에 접근할 경우 access 토큰 인증(passport x)
  isVarifiedAccessToken: (req, res, next) => {
    // const authHeader = req.headers.authorization;
    // const accessToken = authHeader.split(' ')[1];
    const accessToken = req.cookies.accessToken;
    const secret = process.env.SECRET_KEY;
    if (!accessToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decodedAccessToken = jwt.verify(accessToken, secret);
      req.el = decodedAccessToken.el; //미들웨어 적용 시, 유저 이메일(정보) 추출 가능
      next();
    } catch (err) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
  },

  //refressToken 유효성 검사 API
  isVarifiedRefreshToken: async (req, res, next) => {
    // const decodedRefreshToken = jwt.verify(refreshToken, secret);
    // const memberEmail = decodedRefreshToken.el;
    // const refreshToken = await RefreshToken.findOne({ memberEmail });
    const accessToken = req.cookies.accessToken;
    const memberEmail = authServices.decodedAccessToken(accessToken);
    const restoredRefreshToken = await RefreshToken.findOne({ memberEmail })
      .refreshToken;
    const secret = process.env.SECRET_KEY;
    const currentTime = new Date().getTime();
    if (!restoredRefreshToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    const { refreshToken, expiresIn } = restoredRefreshToken;
    if (expiresIn <= currentTime) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decoded = jwt.verify(refreshToken, secret);
      req.email = decoded.el;
      next();
    } catch (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
  },

  //새로운 accessToken 발급 API
  // issueNewAccessToken: async (req, res, next) => {
  //   const refreshToken = await RefreshToken.findOne({ memberEmail });
  //   if (refreshToken == null) {
  //     return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  //   }
  //   jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
  //     if (err)
  //       return res.status(403).json({ message: '인증되지 않은 토큰입니다.' });
  //     const accessToken = issueAccessJWT(user);
  //     res.json({ accessToken });
  //     next();
  //   });
  // },
};

export { authMiddlewares };
