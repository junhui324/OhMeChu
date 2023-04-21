// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { usersController } from '../controller/users-controller.js';

const usersRouter = Router();

//회원 가입
usersRouter.post('/join', usersController.joinUser);

//회원 정보 변경 -> 휴대폰 번호, 주소
usersRouter.put('/myPage/:id', usersController.changeProfile);

export { usersRouter };
