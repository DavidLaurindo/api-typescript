import Joi from "joi"

const createUserValidator = Joi.object({
  name: Joi.string().min(4).max(250).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  timestamps: Joi.any().forbidden(),
})

export default createUserValidator
