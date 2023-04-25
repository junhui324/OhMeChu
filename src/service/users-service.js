import { Users } from '../db/model/index.js';
import bcrypt, { hash } from 'bcrypt';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.( -> password 해쉬로 저장 구현해야함)
  joinUser: async (userObj) => {
    const isEmailInDB = await Users.findOne({ email: userObj.email });
    const isPhoneNumberInDB = await Users.findOne({
      phoneNumber: userObj.phoneNumber,
    });
    if (!isEmailInDB && !isPhoneNumberInDB) {
      userObj.password = await bcrypt.hash(userObj.password, 12);
      const user = await Users.create(userObj);
      return user;
    } else {
      console.log('이미 가입된 사용자입니다.');
      return;
    }
  },

  //로그인 되어있다는 전제 하에..
  //회원 정보 변경 -> ex) { "changeField": "phone_number", "changeData": "01012345678" }
  changeProfile: async (email, password, changeField, changeData) => {
    const user = await Users.findOne({ email: email }); //id로 회원의 정보 찾기
    const userPassword = await Users.findOne({ password: password });
    if (userPassword && userPassword.password === user.password) {
      //사용자가 입력한 password와 일치하는 password가 있으면
      const changeUserData = await Users.updateOne(
        { email: user.email },
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

  isMember: async (email, password) => {
    const memberInfo = await Users.findOne({ email });
    const isPasswordTrue = await bcrypt.compare(password, memberInfo.password);
    return { memberInfo, isPasswordTrue };
  },
};

export { usersService };
