import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../../db/model/index.js';
import bcrypt from 'bcrypt';

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('존재하지 않는 회원입니다.');
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
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
