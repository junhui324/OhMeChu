// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { usersController } from '../controller/users-controller.js';
import { authMiddlewares } from '../../auth/auth-middlewares.js';
// import { usersMiddlewares } from '../middlewares/users-middlewares.js';

const usersRouter = Router();

//회원 가입
usersRouter.post('/join', usersController.joinUser);

//회원 정보 변경 -> 휴대폰 번호, 주소
usersRouter.put('/myPage/:id', usersController.changeProfile);

//로그인
usersRouter.post('/login', usersController.usersLogin);

//로그아웃
usersRouter.get('/logout', usersController.usersLogout);

//마이페이지
// usersRouter.get('/myPage', authMiddlewares.isVarifiedToken, );

//사용자 정보 조회
usersRouter.get(
  '/myPage/:id',
  authMiddlewares.isVarifiedAccessToken,
  usersController.getProfile
);

//사용자 정보 삭제 (탈퇴)
usersRouter.delete('/myPage/:id', usersController.deleteProfile);

//주문 정보 저장
usersRouter.put('/:id', usersController.addOrderNumber);

export { usersRouter };
