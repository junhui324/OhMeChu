import jwt from 'jsonwebtoken';
import { RefreshToken } from '../src/db/model/index.js';
require('dotenv').config();

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

  decodedAccessToken: (accessToken) => {
    const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    if (decodedAccessToken && decodedAccessToken.el) {
      return decodedAccessToken.el;
    }
    return;
  },

  restoreRefreshToken: async (refreshToken, memberEmail, expiresIn) => {
    const restoreRefreshJWT = await RefreshToken.create({
      refreshToken,
      memberEmail,
      expiresIn,
    });
    return restoreRefreshJWT._id;
  },

  getRefreshToken: async (index) => {
    const refreshTokenInDB = await RefreshToken.findOne({ _id: index });
    return refreshTokenInDB;
  },

  deleteRefreshToken: async (index) => {
    const deleteTokenInDB = await RefreshToken.deleteOne({ _id: index });
    return deleteTokenInDB;
  },
};

export { authServices };
