const Joi = require("joi");

exports.adminValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(32).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/).required(),
    });
    return schema.validate(data);
};