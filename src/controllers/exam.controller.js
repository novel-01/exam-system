const { ObjectId } = require("mongoose");
const Group = require("../models/group.model.js");
const Exam = require("../models/exam.model.js");

exports.create = async (req, res, next) => {
    try {
        const { name, group_id, finishDate, passing_score } = req.body;
        if (!name || !finishDate || !group_id || !passing_score) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const file = req.file;
        if (!ObjectId.isValid(group_id)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const findGroup = await Group.findById(group_id);
        if (!findGroup) {
            return res.status(400).json({ message: "Group not found" });
        }

        const findExam = await Exam.findOne({ name, groupId: group_id });
        if (findExam) {
            return res.status(400).json({ message: "Exam already exists" });
        }

        const dateParts = finishDate.split(".");
        const jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        const newExam = await Exam.create({
            name,
            groupId: group_id,
            finishedDate: jsDate,
            passing_score,
            file,
        });

        return res.status(201).json({
            message: "Exam created successfully",
            exam: newExam,
        });
    } catch (error) {
        next(error);
    }
};

exports.getOneExam = async function (req, res, next) {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }
        const findExam = await Exam.findById(id);
        if (!findExam) {
            return res.status(400).json({ message: "Exam not found" });
        }
        return res.status(200).json({
            message: "Exam found successfully",
            exam: findExam,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllExam = async function (req, res, next) {
    try {
        const findExam = await Exam.find();
        if (!findExam) {
            return res.status(400).json({ message: "Exam not found" });
        }
        return res.status(200).json({
            message: "Exam found successfully",
            exam: findExam,
        });
    } catch (error) {
        next(error);
    }
};