import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required()
})