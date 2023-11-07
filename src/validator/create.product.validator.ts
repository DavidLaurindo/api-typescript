import Joi from "joi"

const createProductValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().max(255).required(),
})

export default createProductValidator
