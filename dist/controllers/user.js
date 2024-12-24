import { User } from '../models/user.js';
export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log('====================================');
        console.log(fullName, email, password);
        console.log('====================================');
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password length should be more than 8 characters',
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use Please login',
            });
        }
        await User.create({
            fullName,
            email,
            password,
        });
        res.redirect('/user/login');
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: 'Please provide all required field' });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password length should be more than 8 characters',
            });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist please register",
            });
        }
        const isPasswordMatched = user.comparePassword(password); //comparePassworis for individual user that why i used user not User as it is a model not object
        console.log(isPasswordMatched);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Password',
            });
        }
        const token = user.generateJWT();
        res
            .status(200)
            .cookie('token', token, { httpOnly: true, secure: true })
            .json({
            success: true,
            message: 'Logged in successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
};
export const logout = async (req, res) => {
    res.clearCookie('token').redirect('/');
};
