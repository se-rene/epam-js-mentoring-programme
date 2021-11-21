import Joi from "joi";

const addGroupSchema = Joi.object({
	id: Joi.string(),
	name: Joi.string().required(),
	permissions: Joi.array().items(
		Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
	),
});

const updateGroupSchema = addGroupSchema.keys({
	id: Joi.string().required(),
});

export { addGroupSchema, updateGroupSchema };
