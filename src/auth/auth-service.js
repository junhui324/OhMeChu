import jwt from 'jsonwebtoken';
import { RefreshToken } from '../db/model/index.js';
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

  getRefreshToken: async (memberEmail) => {
    const refreshTokenInDB = await RefreshToken.findOne({ memberEmail });
    return refreshTokenInDB;
  },

  deleteRefreshToken: async (memberEmail) => {
    const deleteTokenInDB = await RefreshToken.deleteOne({ memberEmail });
    return deleteTokenInDB;
  },
};

export { authServices };
