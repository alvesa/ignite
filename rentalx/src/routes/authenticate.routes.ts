import { Router } from 'express';

import { AuthenticateUserUseController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserUseController = new AuthenticateUserUseController();

authenticateRoutes.post('/sessions', authenticateUserUseController.handle);

export { authenticateRoutes };

