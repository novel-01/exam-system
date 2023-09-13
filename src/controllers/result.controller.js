const { ObjectId } = require("mongoose");
const ExamResult = require("../models/result.model.js");

exports.sendResult = async function (req, res, next) {
    try {
        const { student_id, exam_id } = req.body;
        const file = req.file;
        if (!student_id || !exam_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (!ObjectId.isValid(student_id) || !ObjectId.isValid(exam_id)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const date = new Date();
        const findStudent = await ExamResult.findOne({ student_id });
        if (findStudent) {
            return res.status(400).json({ message: "Student already has a result" });
        }

        const resultExam = await ExamResult.create({
            date,
            student_id,
            exam_id,
            file,
        });

        if (resultExam) {
            return res.status(201).json({ message: "Result added" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getExamResults = async function (req, res, next) {
    try {
        const { id } = req.params;
        const findExamResult = await ExamResult.findById(id);

        if (findExamResult) {
            return res.status(200).json({
                message: "Exam result found",
                examResult: findExamResult,
            });
        }

        return res.status(404).json({ message: "Exam result not found" });
    } catch (error) {
        next(error);
    }
};