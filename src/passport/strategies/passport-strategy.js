import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../../db/model/index.js';

// import hashPassword from '../../utils/hash-password';

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
    if (user.password !== password) {
      //hashPassword(password)
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    done(null, {
      // shortId: user.shortId,
      email: user.email,
      name: user.user_name,
      // passwordReset: user.passwordReset,
    });
  } catch (err) {
    done(err, null);
  }
});

export { local };
