// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { usersService } from '../service/users-service.js';
import { authServices } from '../auth/auth-service.js';
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

  usersLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const member = await usersService.isMember(email, password);
      if (!member) {
        return res
          .status(statusCode.unauthorized)
          .json(errorMessage.authorizationError[2]);
      }
      const { memberInfo, isPasswordTrue } = member;
      if (!memberInfo || !isPasswordTrue) {
        return res
          .status(statusCode.unauthorized)
          .json(errorMessage.authorizationError[2]);
      }
      const refreshToken = authServices.issueRefreshJWT(memberInfo); //사용자 정보를 담은 객체:memberInfo
      const expiresIn = Date.now() + 15 * 24 * 60 * 60 * 1000;
      const memberEmail = memberInfo.email;
      await authServices.restoreRefreshToken(
        refreshToken,
        memberEmail,
        expiresIn
      );
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
      const email = req.el;
      await authServices.deleteRefreshToken(email);
      res.status(200).json('로그아웃이 정상적으로 완료되었습니다.');
      return next();
    } catch (err) {
      if (err instanceof AuthenticationError) {
        res
          .status(statusCode.unauthorized)
          .json(errorMessage.authorizationError[0]);
      }
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
      } else if (user === errorMessage.authorizationError[3]) {
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
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};

export { usersController };
