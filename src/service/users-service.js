import { usersDAO } from '../db/usersDAO.js';

const usersService = {
  //회원 가입 -> 휴대폰 번호, 이메일이 DB에 없어야 회원가입 가능.
  joinUser: async (userObj) => {
    const user = await usersDAO.createUser(userObj);
    return user;
  },

  //회원인지 확인하는 함수
  isMember: async (email, password) => {
    const isMember = await usersDAO.isMember(email, password);
    return isMember;
  },

  //회원 정보 변경
  changeProfile: async (email, password, gender, phoneNumber, address) => {
    const user = await usersDAO.updateUserByEmail(
      email,
      password,
      gender,
      phoneNumber,
      address
    );
    return user;
  },

  //사용자 정보 조회
  getProfile: async (email, buttonKey, password) => {
    const user = await usersDAO.findUserByEmail(email, buttonKey, password);
    return user;
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (email) => {
    const user = await usersDAO.deleteUserByEmail(email);
    return user;
  },
};

export { usersService };
