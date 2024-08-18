import express from 'express';

import userController from '../controllers/user.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getusers', authMiddleware.authToken, userController.get_users);
router.get('/:userId', userController.get_user_by_userId);

router.put('/update/:userId', authMiddleware.authToken, userController.update_user_by_userId);

router.delete('/delete/:userId', authMiddleware.authToken, userController.delete_user_by_userId);

export default router;