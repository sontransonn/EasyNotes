import jwt from 'jsonwebtoken';

class tokenUtil {
    static generateToken = async (user) => {
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY
        )

        return token
    }
}

export default tokenUtil