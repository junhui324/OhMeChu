import { Users } from '../db/model/index.js';
import bcrypt from 'bcrypt';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.( -> password 해쉬로 저장 구현해야함)
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
      console.log('이미 가입된 사용자입니다.');
      return;
    }
  },

  //로그인 되어있다는 전제 하에..
  //회원 정보 변경 -> ex) { "changeField": "phone_number", "changeData": "01012345678" }
  changeProfile: async (id, password, changeField, changeData) => {
    const user = await Users.findById(id); //id로 회원의 정보 찾기
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
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

  isMember: async (email, password) => {
    const memberInfo = await Users.findOne({ email });
    if (!memberInfo) {
      return;
    }
    const isPasswordTrue = await bcrypt.compare(password, memberInfo.password);
    return { memberInfo, isPasswordTrue };
  },

  //사용자 정보 조회
  getProfile: async (id, password) => {
    const user = await Users.findById(id);
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const getUserData = await Users.findById(id);
      return getUserData;
    } else {
      console.log('비밀번호가 다릅니다.');
      return;
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (id, password) => {
    const user = await Users.findById(id);
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const getUserData = await Users.findByIdAndDelete(id);
      return getUserData;
    } else {
      console.log('비밀번호가 다릅니다.');
      return;
    }
  },

  //주문 번호 저장
  addOrderNumber: async (id, orderNumber) => {
    const user = await Users.updateOne(
      { _id: id },
      { $push: { orderNumber: orderNumber } }
    );
    return user;
  },
};

export { usersService };
