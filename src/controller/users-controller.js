// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';
import { authServices } from '../../auth/auth-service.js';

const statusCode = {
  success: 200,
  unauthorized: 401,
  forbidden: 403,
  conflict: 409,
};

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
        birth,
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
        birth: birth,
        address: address,
        userPoint: userPoint,
        orderNumber: orderNumber,
      };
      const user = await usersService.joinUser(userObj);
      if (user == '이미 가입된 사용자입니다.') {
        res.status(statusCode.conflict);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  },

  //로그인
  usersLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const member = await usersService.isMember(email, password);
      if (!member) {
        //throw new Error('이메일 또는 비밀번호가 틀렸습니다.');
        res
          .status(statusCode.unauthorized)
          .json('이메일 또는 비밀번호가 틀렸습니다.');
      }
      const { memberInfo, isPasswordTrue } = member;
      if (!memberInfo || !isPasswordTrue) {
        //throw new Error('이메일 또는 비밀번호가 틀렸습니다.');
        res
          .status(statusCode.unauthorized)
          .json('이메일 또는 비밀번호가 틀렸습니다.');
      }
      const refreshToken = authServices.issueRefreshJWT(memberInfo); //사용자 정보를 담은 객체:memberInfo
      const accessToken = authServices.issueAccessJWT(memberInfo);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // HTTPS 연결에서만 쿠키 전송
        sameSite: 'none', // Cross-site 요청에서도 쿠키 전송
      });
      res.status(statusCode.success).json({ accessToken });
    } catch (err) {
      return next(err);
    }
  },

  //로그아웃
  usersLogout: async (req, res, next) => {
    try {
      res.clearCookie('refreshToken');
      res.redirect('/api/users/login'); //추후 수정
    } catch (err) {
      return next(err);
    }
  },

  //회원 정보 변경 -> 휴대폰 번호, 주소
  changeProfile: async (req, res, next) => {
    try {
      //jwt 토큰에서 이메일 정보 추출
      //const accessToken = req.headers.authorization.split('Bearer ')[1];
      //const email = authServices.decodedAccessToken(accessToken);
      const email = req.el;
      const { password, changeField, changeData } = req.body;
      const user = await usersService.changeProfile(
        email,
        password,
        changeField,
        changeData
      );
      if (user == '비밀번호가 다릅니다.') {
        res.status(statusCode.conflict);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 조회
  getProfile: async (req, res, next) => {
    try {
      const email = req.el;
      const { password } = req.body;
      const user = await usersService.getProfile(email, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (req, res, next) => {
    try {
      const email = req.el;
      const { password } = req.body;
      const user = await usersService.deleteProfile(email, password);
      if (user == '비밀번호가 다릅니다.') {
        res.status(statusCode.conflict);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  },
};

export { usersController };
