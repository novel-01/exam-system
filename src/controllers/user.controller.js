const User = require('../models/user.model');
const Group = require('../models/group.model');
const Membership = require('../models/membership.model');
const bcrypt = require('bcrypt')
const {customError} = require('../utils/custom.error');
const {userValidation} = require('../validations/user.validation');
const {adminValidation} = require('../validations/admin.validation');
const {generateToken} = require('../utils/jwt')
exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password, phone_number } = req.body;

        if (!username || !password || !email || !phone_number) {
            return res.status(400).json({
                message: "Please provide all fields",
            });
        }

        const { error } = userValidation({
            username,
            email,
            password,
            phone_number,
        });

        if (error) {
            throw new customError(400, error.details[0].message);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const findUser = await User.findOne({ username });

        if (findUser) {
            return res.status(403).json({
                message: "User already exists",
            });
        }

        const data = await User.create({
            username,
            email,
            password: hashedPassword,
            phone_number,
        });

        if (data) {
            const token = generateToken({
                _id: data._id,
            });

            return res.status(201).json({
                message: "User created successfully",
                token,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Please provide all fields",
            });
        }

        const { error } = adminValidation({
            username,
            email,
            password,
        });

        if (error) {
            throw new customError(400, error.details[0].message);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const update = await User.findByIdAndUpdate(
            id,
            {
                username,
                email,
                password: hashedPassword,
            },
            { new: true }
        );

        if (update) {
            return res.status(201).json({
                message: "User updated successfully",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await User.findByIdAndDelete(id);

        if (data) {
            return res.status(201).json({
                message: "User deleted successfully",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (users) {
            return res.status(200).json({
                message: "Users fetched successfully",
                users,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const findGroups = await Membership.find({ user_id: id });
        const groups = [];

        for (let i = 0; i < findGroups.length; i++) {
            const data = await Group.findById(findGroups[i].group_id);
            if (data) {
                groups.push(data);
            }
        }

        const parseUser = JSON.parse(JSON.stringify(user));
        parseUser.groups = groups;

        if (user) {
            return res.status(201).json({
                message: "User fetched successfully",
                user: parseUser,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Please provide all fields",
            });
        }

        const { error } = userValidation({
            username,
            password,
            email,
        });

        if (error) {
            throw new customError(400, error.details[0].message);
        }

        const findUser = await User.findOne({ username });

        if (findUser) {
            const verifyPassword = await bcrypt.compare(password, findUser.password);

            if (verifyPassword) {
                const token = generateToken({
                    _id: findUser._id,
                });

                return res.json({
                    message: "Successfully login",
                    token,
                });
            } else {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }
        } else {
            return res.status(403).json({
                message: "User not found",
            });
        }
    } catch (error) {
        next(error);
    }
};