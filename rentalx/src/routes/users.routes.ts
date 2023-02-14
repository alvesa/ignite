import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const createUserController: CreateUserController = new CreateUserController();
const updateUserAvatarController: CreateUserController =
  new UpdateUserAvatarController();
const upload = multer({
  dest: './avatar',
});

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  updateUserAvatarController.handle
);

export { usersRoutes };

