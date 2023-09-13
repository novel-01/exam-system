import mongoose from "mongoose";

const { groupValidation } = require("../validations/group.validation");
const Group = require("../models/group.model");
const customError = require("../utils/custom.error");
const ObjectId = mongoose.Types.ObjectId;
const {Membership} = require('../models/membership.model')

exports.create = async function (req, res, next) {
    try {
        const { name, direction, lessonDays, lessonTime, adminId } = req.body;

        if (!name || !direction || !lessonDays || !lessonTime || !adminId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const { error } = groupValidation({
            name,
            direction,
            lessonDays,
            lessonTime,
        });

        if (error) {
            throw new customError(400, error.details[0].message);
        }

        const data = await Group.create({
            name,
            direction,
            lessonDays,
            lessonTime,
            adminId,
        });

        if (data) {
            return res.status(201).json({ message: "Group created successfully" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getOneGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Group.findById(id);

        if (data) {
            return res.status(200).json({
                message: "Group retrieved successfully",
                data,
            });
        }

        return res.status(404).json({ message: "Group not found" });
    } catch (error) {
        next(error);
    }
};

exports.getAllGroup = async (req, res, next) => {
    try {
        const data = await Group.find();

        return res.status(200).json({
            message: "Group retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.removeGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Group.findByIdAndDelete(id);

        if (data) {
            return res.status(200).json({ message: "Group deleted successfully" });
        }

        return res.status(404).json({ message: "Group not found" });
    } catch (error) {
        next(error);
    }
};

exports.joinGroup = async (req, res, next) => {
    try {
        const { group_id, user_id } = req.body;

        if (!group_id || !user_id) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (!ObjectId.isValid(group_id) || !ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const findUser = await Membership.findById(user_id);

        if (findUser) {
            return res.status(400).json({ message: "Student already joined" });
        }

        const data = await Membership.create({
            group_id,
            user_id,
        });

        if (data) {
            return res.status(200).json({ message: "Student joined successfully" });
        }
    } catch (error) {
        next(error);
    }
};