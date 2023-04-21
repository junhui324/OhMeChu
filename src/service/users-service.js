// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Users } from '../db/model/index.js';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.( -> password 해쉬로 저장 구현해야함)
  joinUser: async (
    user_name,
    password,
    email,
    phone_number,
    address,
    user_point
  ) => {
    const isEmailInDB = await Users.findOne({ email: email });
    const isPhoneNumberInDB = await Users.findOne({
      phone_number: phone_number,
    });
    if (!isEmailInDB && !isPhoneNumberInDB) {
      const user = await Users.create({
        user_name,
        password,
        email,
        phone_number,
        address,
        user_point,
      });
      return user;
    } else {
      return;
    }
  },

  //회원 정보 변경 -> 휴대폰 번호, 주소
  changeProfile: async (id, password, changeField, changeData) => {
    const user = await Users.findById(id); //id로 회원의 정보 찾기
    const userPassword = await Users.findOne({ password: password });
    if (userPassword && userPassword.password === user.password) {
      //사용자가 입력한 password와 일치하는 password가 있으면
      const changeUserData = await Users.updateOne(
        { _id: user._id },
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
