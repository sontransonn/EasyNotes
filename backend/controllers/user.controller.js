import User from "../models/user.model.js"

class userController {
    static get_users = async (req, res) => {
        console.log(req.user);

    }

    static get_user_by_userId = async (req, res) => {

    }

    static update_user_by_userId = async (req, res) => {

    }

    static delete_user_by_userId = async (req, res) => {

    }
}

export default userController