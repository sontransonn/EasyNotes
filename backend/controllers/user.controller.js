import bcrypt from 'bcryptjs';

import User from "../models/user.model.js"

import errorUtil from '../utils/error.util.js';

class userController {
    static get_users = async (req, res) => {
        console.log(req.user);

    }

    static get_user_by_userId = async (req, res) => {

    }

    static update_user_by_userId = async (req, res, next) => {
        try {
            if (req.user.id !== req.params.userId) {
                return next(errorUtil.generateError(403, 'You are not allowed to update this user'));
            }

            if (req.body.password) {
                if (req.body.password.length < 6) {
                    return next(errorUtil.generateError(400, 'Password must be at least 6 characters'));
                }

                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            if (req.body.username) {
                if (req.body.username.length < 7 || req.body.username.length > 20) {
                    return next(errorUtil.generateError(400, 'Username must be between 7 and 20 characters'));
                }

                if (req.body.username.includes(' ')) {
                    return next(errorUtil.generateError(400, 'Username cannot contain spaces'));
                }

                if (req.body.username !== req.body.username.toLowerCase()) {
                    return next(errorUtil.generateError(400, 'Username must be lowercase'));
                }

                if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                    return next(errorUtil.generateError(400, 'Username can only contain letters and numbers'));
                }
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: {
                        username: req.body.username,
                        email: req.body.email,
                        profilePicture: req.body.profilePicture,
                        password: req.body.password,
                    },
                },
                { new: true }
            );

            const { password, ...rest } = updatedUser._doc;

            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }

    static delete_user_by_userId = async (req, res) => {
        try {
            if (!req.user.isAdmin && req.user.id !== req.params.userId) {
                return next(errorUtil.generateError(403, 'You are not allowed to delete this user'));
            }

            await User.findByIdAndDelete(req.params.userId);

            res.status(200).json('User has been deleted');
        } catch (error) {
            next(error);
        }
    }
}

export default userController