import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../../db/model/index.js';

const config = {
  usernameField: 'id',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (id, password, done) => {
  try {
    const user = await Users.findOne({ user_id: id });
    if (!user) {
      throw new Error('존재하지 않는 회원입니다.');
    }
    if (user.password !== password) {
      //hashPassword(password)
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    done(null, {
      //shortId: user.shortId,
      user_id: user.user_id,
      name: user.user_name,
      //passwordReset: user.passwordReset,
    });
  } catch (err) {
    done(err, null);
  }
});

export { local };
