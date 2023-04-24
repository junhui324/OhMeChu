// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';

const usersController = {
  //회원 가입
  joinUser: async (req, res, next) => {
    try {
      const {
        userName,
        password,
        email,
        phoneNumber,
        gender,
        address,
        userPoint,
        orderNumber,
      } = req.body;
      const userObj = {
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        address: address,
        userPoint: userPoint,
        orderNumber: orderNumber,
      };
      const user = await usersService.joinUser(userObj);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //회원 정보 변경 -> 휴대폰 번호, 주소
  changeProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password, changeField, changeData } = req.body;
      const user = await usersService.changeProfile(
        id,
        password,
        changeField,
        changeData
      );
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 조회
  getProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await usersService.getProfile(id, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await usersService.deleteProfile(id, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //주문 정보 저장
  addOrderNumber: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { orderNumber } = req.body;
      const user = await usersService.addOrderNumber(id, orderNumber);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  //추가
};

export { usersController };
