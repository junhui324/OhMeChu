import { Users } from '../db/model/index.js';
import bcrypt from 'bcrypt';
import { errorMessage } from '../misc/error-message.js';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.
  joinUser: async (userObj) => {
    const isEmailInDB = await Users.findOne({ email: userObj.email });
    const isPhoneNumberInDB = await Users.findOne({
      phoneNumber: userObj.phoneNumber,
    });
    if (!isEmailInDB && !isPhoneNumberInDB) {
      const salt = await bcrypt.genSalt(12);
      userObj.password = await bcrypt.hash(userObj.password, salt);
      const user = await Users.create(userObj);
      return user;
    } else {
      return errorMessage.conflictError;
    }
  },

  //회원인지 확인하는 함수
  isMember: async (email, password) => {
    const memberInfo = await Users.findOne({ email });
    if (!memberInfo) {
      return;
    }
    const isPasswordTrue = await bcrypt.compare(password, memberInfo.password);
    return { memberInfo, isPasswordTrue };
  },

  //회원 정보 변경
  changeProfile: async (email, password, gender, phoneNumber, address) => {
    const user = await Users.findOne({ email: email }); //id로 회원의 정보 찾기
    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt);
    const changeUserData = await Users.updateOne(
      { email: user.email },
      {
        password: password,
        gender: gender,
        phoneNumber: phoneNumber,
        address: address,
      }
    );
    return changeUserData;
  },

  //사용자 정보 조회
  getProfile: async (email, buttonKey, password) => {
    const user = await Users.findOne({ email: email });
    if (buttonKey === 'modify') {
      const isPassword = await bcrypt.compare(password, user.password);
      if (isPassword) {
        return '비밀번호가 맞습니다.';
      } else {
        return errorMessage.authorizationError[4];
      }
    } else {
      return user;
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (email) => {
    const user = await Users.deleteOne({ email: email });
    return user;
  },
};

export { usersService };
