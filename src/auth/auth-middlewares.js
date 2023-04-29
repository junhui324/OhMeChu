import { authServices } from './auth-service.js';
import jwt from 'jsonwebtoken';
import { errorMessage } from '../misc/error-message.js';
require('dotenv').config();

const statusCode = {
  unauthorized: 401,
};

const authMiddlewares = {
  //refreshToken 유효성 검사 API -> 재발급
  isVerifiedRefreshToken: async (req, res, next) => {
    const email = req.el;
    const restoredRefreshToken = await authServices.getRefreshToken(email);
    const secret = process.env.SECRET_KEY;
    const currentTime = Date.now();
    if (!restoredRefreshToken) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
    try {
      const { refreshToken, expiresIn } = restoredRefreshToken; //db에 저장된 토큰 정보
      const decoded = jwt.verify(refreshToken, secret); //payload
      req.email = decoded.el;
      //만료돼서 새롭게 생성 -> 생성 후 access 발급
      if (Date.parse(expiresIn) <= currentTime) {
        const newExpiresIn = Date.now() + 15 * 24 * 60 * 60 * 1000;
        await authServices.deleteRefreshToken(decoded.el);
        const newRefreshToken = authServices.issueRefreshJWT({
          email: decoded.el,
        });
        //refresh 토큰 만료안됨 -> 그대로 access 발급
        await authServices.restoreRefreshToken({
          refreshToken: newRefreshToken,
          memberEmail: decoded.el,
          expiresIn: newExpiresIn,
        });
      }
      return authMiddlewares.issueNewAccessToken(req, res, next);
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },

  //로그인 유저 전용 페이지에 접근할 경우 access 토큰 인증
  isVerifiedAccessToken: async (req, res, next) => {
    let accessToken = req.headers.authorization;
    const secret = process.env.SECRET_KEY;
    if (!accessToken) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
    accessToken = accessToken.split(' ')[1];
    try {
      const decodedAccessToken = jwt.verify(accessToken, secret);
      req.el = decodedAccessToken.el; //미들웨어 적용 시, 유저 이메일(정보) 추출 가능
      if (Date.now() + 1000 * 60 <= decodedAccessToken.exp) {
        await authMiddlewares.isVerifiedRefreshToken(req, res, next);
      }
      return next();
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },

  //RefreshToken으로 새로운 accessToken 발급 API
  issueNewAccessToken: async (req, res, next) => {
    try {
      const memberEmail = req.email;
      if (!memberEmail) {
        return res
          .status(statusCode.unauthorized)
          .json({ message: errorMessage.authorizationError[0] });
      }
      const accessToken = authServices.issueAccessJWT({ email: memberEmail });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.json(accessToken);
      return next();
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },
  checkIfAlreadyLoggedIn: async (req, res, next) => {
    let accessToken = req.headers.authorization;
    if (accessToken) {
      accessToken = accessToken.split(' ')[1];
      return res.status(409).json({ message: '이미 로그인된 유저입니다.' });
    }
    return next();
  },
};

export { authMiddlewares };
