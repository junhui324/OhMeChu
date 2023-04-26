import jwt from 'jsonwebtoken';
//import { RefreshToken } from './model/index.js';

//JWT 생성
const authServices = {
  issueAccessJWT: (user) => {
    const payload = { el: user.email }; //el: email, au: customer
    const secret = process.env.SECRET_KEY;
    const expiresIn = '1h';
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return accessToken;
  },
  issueRefreshJWT: (user) => {
    const payload = { el: user.email };
    const secret = process.env.SECRET_KEY;
    const expiresIn = '15d';
    const refreshToken = jwt.sign(payload, secret, { expiresIn });
    return refreshToken;
  },
  /*
  restoreRefreshJWT: async (refreshToken) => {
    const restoreRefreshJWT = await RefreshToken.create({
      refreshToken,
      user,
      exipresIn,
    });
    await refreshToken.save();
    return restoreRefreshJWT;
  },
*/
  decodedAccessToken: (accessToken) => {
    const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (decodedAccessToken && decodedAccessToken.el) {
      return decodedAccessToken.el;
    }
    return;
  },
};

export { authServices };
