import jwt from 'jsonwebtoken';

const authServices = {
  issueJWT: (user) => {
    const payload = { el: user.email };
    const expiresIn = '1h';
    const token = jwt.sign(
      payload,
      { secret: process.env.SECRET_KEY },
      { expiresIn }
    );
    return {
      token,
      expiresIn,
    };
  },
};

export { authServices };
