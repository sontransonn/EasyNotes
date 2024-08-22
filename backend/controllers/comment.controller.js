import Comment from "../models/comment.model.js"

import errorUtil from "../utils/error.util.js"

class commentController {
    static get_commemts_by_postId = async (req, res, next) => {
        try {
            const comments = await Comment.find({ postId: req.params.postId }).sort({
                createdAt: -1,
            });

            res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }

    static get_commemts = async (req, res, next) => {
        try {
            if (!req.user.isAdmin)
                return next(errorUtil.generateError(403, 'You are not allowed to get all comments'));

            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.sort === 'desc' ? -1 : 1;

            const comments = await Comment.find()
                .sort({ createdAt: sortDirection })
                .skip(startIndex)
                .limit(limit);
            const totalComments = await Comment.countDocuments();
            const now = new Date();
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );
            const lastMonthComments = await Comment.countDocuments({
                createdAt: { $gte: oneMonthAgo },
            });

            res.status(200).json({
                comments,
                totalComments,
                lastMonthComments
            });
        } catch (error) {
            next(error);
        }
    }

    static create_comment = async (req, res, next) => {
        try {
            const { content, postId, userId } = req.body;

            if (userId !== req.user.id) {
                return next(errorUtil.generateError(403, 'You are not allowed to create this comment'));
            }

            const newComment = new Comment({
                content,
                postId,
                userId,
            });

            await newComment.save();

            res.status(200).json(newComment);
        } catch (error) {
            next(error);
        }
    }

    static like_comment = async (req, res, next) => {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorUtil.generateError(404, 'Comment not found'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();

        res.status(200).json(comment);
    }

    static edit_comment = async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.commentId);

            if (!comment) {
                return next(errorUtil.generateError(404, 'Comment not found'));
            }

            if (comment.userId !== req.user.id && !req.user.isAdmin) {
                return next(errorUtil.generateError(403, 'You are not allowed to edit this comment'));
            }

            const editedComment = await Comment.findByIdAndUpdate(
                req.params.commentId,
                {
                    content: req.body.content,
                },
                { new: true }
            );

            res.status(200).json(editedComment);
        } catch (error) {
            next(error);
        }
    }

    static delete_comment_by_commentId = async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.commentId);
            if (!comment) {
                return next(errorUtil.generateError(404, 'Comment not found'));
            }
            if (comment.userId !== req.user.id && !req.user.isAdmin) {
                return next(errorUtil.generateError(403, 'You are not allowed to delete this comment'));
            }

            await Comment.findByIdAndDelete(req.params.commentId);
            res.status(200).json('Comment has been deleted');
        } catch (error) {
            next(error);
        }
    }
}

export default commentController