import express from 'express';

import commentController from '../controllers/comment.controller.js';

import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/getPostComments/:postId', commentController.get_commemts_by_postId);
router.get('/getcomments', authMiddleware.authToken, commentController.get_commemts);

router.post('/create', authMiddleware.authToken, commentController.create_comment);

router.put('/likeComment/:commentId', authMiddleware.authToken, commentController.like_comment);
router.put('/editComment/:commentId', authMiddleware.authToken, commentController.edit_comment);

router.delete('/deleteComment/:commentId', authMiddleware.authToken, commentController.delete_comment_by_commentId);


export default router;