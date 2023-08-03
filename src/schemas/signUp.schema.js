import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.password().required()
})

export default signUpSchema