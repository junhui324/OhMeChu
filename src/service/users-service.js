// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Users } from '../db/model/index.js';
import bcrypt, { hash } from 'bcrypt';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.( -> password 해쉬로 저장 구현해야함)
  joinUser: async (
    user_id,
    user_name,
    password,
    email,
    phone_number,
    address,
    user_point
  ) => {
    const isIdInDB = await Users.findOne({ user_id: user_id });
    const isPhoneNumberInDB = await Users.findOne({
      phone_number: phone_number,
    });
    if (!isIdInDB && !isPhoneNumberInDB) {
      password = await bcrypt.hash(password, 12);
      const user = await Users.create({
        user_id,
        user_name,
        password,
        email,
        phone_number,
        address,
        user_point,
      });
      return user;
    } else {
      console.log('이미 가입된 사용자입니다.');
      return;
    }
  },

  //로그인 되어있다는 전제 하에..
  //회원 정보 변경 -> ex) { "changeField": "phone_number", "changeData": "01012345678" }
  changeProfile: async (user_id, password, changeField, changeData) => {
    const user = await Users.findOne({ user_id: user_id }); //id로 회원의 정보 찾기
    const userPassword = await Users.findOne({ password: password });
    if (userPassword && userPassword.password === user.password) {
      //사용자가 입력한 password와 일치하는 password가 있으면
      const changeUserData = await Users.updateOne(
        { user_id: user.user_id },
        {
          [changeField]: changeData,
        }
      );
      return changeUserData;
    } else {
      console.log('비밀번호가 다릅니다.');
      return;
    }
  },
};

export { usersService };
