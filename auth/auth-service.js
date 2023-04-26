import jwt from 'jsonwebtoken';

//JWT 생성
const authServices = {
  issueAccessJWT: (user) => {
    const payload = { el: user.email }; //el: email, rl: customer
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
};

export { authServices };
