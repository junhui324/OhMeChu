// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';

const usersController = {
  //회원 가입
  joinUser: async (req, res, next) => {
    try {
      const { user_name, password, email, phone_number, address, user_point } =
        req.body;
      const user = await usersService.joinUser(
        user_name,
        password,
        email,
        phone_number,
        address,
        user_point
      );
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
  //추가
};

export { usersController };
