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
      throw new Error('저장된 refresh token이 없습니다.');
    }
    try {
      const { refreshToken, expiresIn } = restoredRefreshToken;
      const decoded = jwt.verify(refreshToken, secret);
      if (Date.parse(expiresIn) <= currentTime) {
        await authServices.deleteRefreshToken(email);
        throw new Error('refresh token이 만료되었습니다. 다시 로그인하세요.');
      }
      req.email = decoded.el;
      return authMiddlewares.issueNewAccessToken(req, res, next);
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },

  //로그인 유저 전용 페이지에 접근할 경우 access 토큰 인증
  isVerifiedAccessToken: async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new Error('토큰이 없습니다.');
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    const secret = process.env.SECRET_KEY;
    try {
      const decodedAccessToken = jwt.verify(accessToken, secret);
      req.el = decodedAccessToken.el;
      if (Date.now() + 1000 * 60 * 5 >= decodedAccessToken.exp * 1000) {
        await authMiddlewares.isVerifiedRefreshToken(req, res, next);
        return;
      }
      return next();
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },

  //RefreshToken으로 새로운 accessToken 발급
  issueNewAccessToken: (req, res, next) => {
    try {
      const memberEmail = req.email;
      if (!memberEmail) {
        throw new Error('유저 정보가 없습니다.');
      }
      const accessToken = authServices.issueAccessJWT({ email: memberEmail });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return res.json({
        message: '새로운 accessToken을 사용하세요',
        accessToken,
      });
    } catch (err) {
      return res
        .status(statusCode.unauthorized)
        .json({ message: errorMessage.authorizationError[1] });
    }
  },
};

export { authMiddlewares };
