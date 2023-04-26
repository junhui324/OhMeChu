import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Users } from '../../db/model/index.js';
require('dotenv').config();

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const jwt = new JwtStrategy(jwtOpts, async (jwtPayload, done) => {
  try {
    const user = await Users.findOne({ email: jwtPayload.el });
    if (!user) {
      return done(null, false, { message: '유효하지 않는 토큰입니다.1' });
    }
    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
});

export { jwt };
