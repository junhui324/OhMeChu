// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';
import { authServices } from '../../auth/auth-service.js';

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
      } = req.body;
      const userObj = {
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        address: address,
        userPoint: userPoint,
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

  usersLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { memberInfo, isPasswordTrue } = await usersService.isMember(
        email,
        password
      );
      if (!memberInfo || !isPasswordTrue) {
        throw new Error('이메일 또는 비밀번호가 틀렸습니다.');
      }
      const token = authServices.issueJWT(memberInfo); //사용자 정보를 담은 객체:memberInfo
      res.cookie('token', token, {
        httpOnly: true,
        secure: true, // HTTPS 연결에서만 쿠키 전송
        sameSite: 'none', // Cross-site 요청에서도 쿠키 전송
      });

      res.redirect('/api');
    } catch (err) {
      next(err);
      return;
    }
  },

  usersLogout: async (req, res, next) => {
    try {
      res.clearCookie('token');
      res.redirect('/api/users/login');
    } catch (err) {
      next(err);
      return;
    }
  },

  //추가
};

export { usersController };
