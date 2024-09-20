import Joi from 'joi';

// Define the schema for the login request
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(100).required(),
  email: Joi.string().email().required(),
});

export default loginSchema;
