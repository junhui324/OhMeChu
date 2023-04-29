// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { usersController } from '../controller/users-controller.js';
import { authMiddlewares } from '../auth/auth-middlewares.js';
const usersRouter = Router();

//회원 가입
usersRouter.post('/join', usersController.joinUser);

//로그인
usersRouter.post('/login', usersController.usersLogin);

//로그아웃
usersRouter.post(
  '/logout',
  authMiddlewares.isVerifiedAccessToken,
  usersController.usersLogout
);

//회원 정보 변경 -> 휴대폰 번호, 주소
usersRouter.put(
  '/myPage',
  authMiddlewares.isVerifiedAccessToken,
  usersController.changeProfile
);

//사용자 정보 조회
usersRouter.get(
  '/myPage',
  authMiddlewares.isVerifiedAccessToken,
  usersController.getProfile
);

usersRouter.post(
  '/myPage',
  authMiddlewares.isVerifiedAccessToken,
  usersController.getProfile
);

//사용자 정보 삭제 (탈퇴)
usersRouter.delete(
  '/myPage',
  authMiddlewares.isVerifiedAccessToken,
  usersController.deleteProfile
);

export { usersRouter };
