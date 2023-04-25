import jwt from 'jsonwebtoken';

//JWT 생성
const authServices = {
  issueJWT: (user) => {
    const payload = { el: user.email };
    const secret = process.env.SECRET_KEY;
    const expiresIn = '1h';
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  },
};

export { authServices };
