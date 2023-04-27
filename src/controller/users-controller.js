// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';
import { authServices } from '../../auth/auth-service.js';
import { errorMessage } from '../misc/error-message.js';

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
      if (user === errorMessage.conflictError) {
        return res.status(statusCode.conflict).json(user);
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
        return res
          .status(statusCode.unauthorized)
          .json(errorMessage.authorizationError[3]);
      }
      const { memberInfo, isPasswordTrue } = member;
      if (!memberInfo || !isPasswordTrue) {
        return res
          .status(statusCode.unauthorized)
          .json(errorMessage.authorizationError[3]);
      }
      const refreshToken = authServices.issueRefreshJWT(memberInfo); //사용자 정보를 담은 객체:memberInfo
      const expiresIn = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      const memberEmail = memberInfo.email;
      const refreshTokenIndex = await authServices.restoreRefreshToken(
        //db에 refresh token 저장
        refreshToken,
        memberEmail,
        expiresIn
      );
      res.cookie('refreshTokenIndex', refreshTokenIndex, {
        httpOnly: true,
        secure: true, // HTTPS 연결에서만 쿠키 전송
        sameSite: 'none', // Cross-site 요청에서도 쿠키 전송
      });
      const accessToken = authServices.issueAccessJWT(memberInfo);
      res.json({ accessToken });
      return next();
    } catch (err) {
      return next(err);
    }
  },

  //로그아웃
  usersLogout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken');
      return next();
      // res.redirect('/api/users/login'); //추후 수정
    } catch (err) {
      return next(err);
    }
  },

  //회원 정보 변경 -> 휴대폰 번호, 주소
  changeProfile: async (req, res, next) => {
    try {
      const email = req.el;
      const { password, gender, phoneNumber, address } = req.body;
      const user = await usersService.changeProfile(
        email,
        password,
        gender,
        phoneNumber,
        address
      );
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 조회
  getProfile: async (req, res, next) => {
    try {
      const email = req.el;
      const buttonKey = req.query.btn;
      const { password } = req.body;
      const user = await usersService.getProfile(email, buttonKey, password);
      if (user === '비밀번호가 맞습니다.') {
        return res.status(statusCode.success).json(user);
      } else if (user === errorMessage.authorizationError[4]) {
        return res.status(statusCode.unauthorized).json(user);
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  //사용자 정보 삭제 (탈퇴)
  deleteProfile: async (req, res, next) => {
    try {
      const email = req.el;
      const user = await usersService.deleteProfile(email);
      if (user === errorMessage.authorizationError[4]) {
        return res.status(statusCode.unauthorized).json(user);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  },
};

export { usersController };
