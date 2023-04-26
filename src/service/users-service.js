import { Users } from '../db/model/index.js';
import bcrypt from 'bcrypt';

//  /api/myPage에 접근 할 때, 로그인 된 유저인지 확인하기

//  /api/myPage -> 바로 회원 정보 보이게.. (해당 유저의 users 스키마 get해서 보내주기) : 토큰(토큰에 있는 이메일)으로.. DB에 있는 유저 찾아야함
//  /api/myPage -> '회원 정보 수정 버튼' 클릭 -> 비번 검사해서.. 회원 정보 변경 할 수 있게
//  /api/myPage -> '회원 탈퇴 버튼' 클릭 -> 비번 검사해서.. DB에서 회원 정보 삭제

//  /api/orders -> '주문 완료 버튼' 클릭 -> 토큰이 있으면 orders스키마에 email 추가해서 주문 생성, 없으면 그냥 주문 생성

//  /api/myPage -> '주문 정보 조회 버튼' 클릭 -> 토큰에 있는 email과 orders DB의 주문들의 email을 비교해서 -> 같은 email인 order를 get해서 보내주기

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
      console.log('이미 가입된 사용자입니다.');
      return;
    }
  },

  //로그인 되어있다는 전제 하에.. email 비교하고
  //회원 정보 변경 -> ex) { "changeField": "phone_number", "changeData": "01012345678" }
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
  getProfile: async (email, password) => {
    const user = await Users.findOne({ email: email });
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const getUserData = await Users.findById({ email: email });
      return getUserData;
    } else {
      console.log('비밀번호가 다릅니다.');
      return;
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (email, password) => {
    const user = await Users.findById(email);
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const getUserData = await Users.findByIdAndDelete({ email: email });
      return getUserData;
    } else {
      console.log('비밀번호가 다릅니다.');
      return;
    }
  },

  //주문 번호 저장
  addOrderNumber: async (email, orderNumber) => {
    const user = await Users.updateOne(
      { email: email },
      { $push: { orderNumber: orderNumber } }
    );
    return user;
  },
};

export { usersService };
