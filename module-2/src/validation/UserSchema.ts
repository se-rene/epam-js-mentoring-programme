const Joi = require("joi");

const addUserSchema = Joi.object({
	id: Joi.string(),
	login: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
		.required(),
	age: Joi.number().integer().min(4).max(120).required(),
	isDeleted: Joi.boolean(),
});

const updateUserSchema = addUserSchema.keys({
	id: Joi.string().required(),
	isDeleted: Joi.boolean().required(),
});

export { addUserSchema, updateUserSchema };
