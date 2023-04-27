import authServices from './auth-service.js';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const authMiddlewares = {
  //refreshToken 유효성 검사 API
  isVerifiedRefreshToken: async (req, res, next) => {
    const email = req.el;
    const restoredRefreshToken = await authServices.getRefreshToken(email);
    const secret = process.env.SECRET_KEY;
    const currentTime = new Date().getTime();
    if (!restoredRefreshToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    const { refreshToken, memberEmail, expiresIn } = restoredRefreshToken; //db에 저장된 토큰 정보
    try {
      const decoded = jwt.verify(refreshToken, secret); //payload
      req.email = decoded.el;
      if (expiresIn > currentTime) {
        req.email = memberEmail;
        return next();
      }
      if (expiresIn <= currentTime) {
        const expiresIn = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const newRefreshToken = authServices.issueRefreshJWT({
          email: decoded.el,
        });
        await authServices.restoreRefreshToken({
          refreshToken: newRefreshToken,
          memberEmail: decoded.el,
          expiresIn,
        });
      }
      return next();
    } catch (err) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
  },

  //로그인 유저 전용 페이지에 접근할 경우 access 토큰 인증
  isVerifiedAccessToken: (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    const secret = process.env.SECRET_KEY;
    if (!accessToken) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    try {
      const decodedAccessToken = jwt.verify(accessToken, secret);
      req.el = decodedAccessToken.el; //미들웨어 적용 시, 유저 이메일(정보) 추출 가능
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return authMiddlewares.isVerifiedRefreshToken(req, res, next);
      }
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
  },

  //RefreshToken으로 새로운 accessToken 발급 API
  issueNewAccessToken: async (req, res, next) => {
    try {
      const memberEmail = req.email;
      if (!memberEmail) {
        return res
          .status(401)
          .json({ message: '유효하지 않은 인증정보 입니다.' });
      }
      const accessToken = issueAccessJWT({ email: memberEmail });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.json(accessToken);
      return next();
    } catch (err) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
  },
};

export { authMiddlewares };
