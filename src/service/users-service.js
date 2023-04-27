import { Users } from '../db/model/index.js';
import bcrypt from 'bcrypt';

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
      return '이미 가입된 사용자입니다.';
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
  changeProfile: async (email, password, changeField, changeData) => {
    const user = await Users.findOne({ email: email }); //id로 회원의 정보 찾기
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      //사용자가 입력한 password와 일치하는 password가 있으면
      const changeUserData = await Users.updateOne(
        { email: user.email },
        {
          [changeField]: changeData,
        }
      );
      return changeUserData;
    } else {
      return '비밀번호가 다릅니다.';
    }
  },

  //사용자 정보 조회
  getProfile: async (email) => {
    const user = await Users.findOne({ email: email });
    return user;
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (email, password) => {
    const user = await Users.findOne({ email: email });
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const getUserData = await Users.deleteOne({ email: email });
      return getUserData;
    } else {
      return '비밀번호가 다릅니다.';
    }
  },
};

export { usersService };
