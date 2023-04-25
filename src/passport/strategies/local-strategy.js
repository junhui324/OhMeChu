/*
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../../db/model/index.js';
import bcrypt from 'bcrypt';

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  //인증만 하도록 => refresh 토큰, 또는 만료 토큰 => 만료기간을 조회하고 만료하면 만료된 토큰이라 응답
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return done(null, false, { message: '존재하지 않는 회원입니다.' });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return done(null, false, {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    if (user && isPassword) {
      done(null, {
        // shortId: user.shortId,
        email: user.email,
        name: user.userName,
        // passwordReset: user.passwordReset,
      });
      console.log('로그인 성공! 홈 화면으로 이동');
    }
  } catch (err) {
    done(err, null);
  }
});

export { local };
*/
