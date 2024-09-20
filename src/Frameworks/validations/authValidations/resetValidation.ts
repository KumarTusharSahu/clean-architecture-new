import Joi from 'joi';

// Define the schema for the reset request
const resetSchema = Joi.object({
  newPassword: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().min(6).max(100).required(),
});

export default resetSchema;
