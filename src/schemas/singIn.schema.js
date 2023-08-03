import Joi from "joi";

const signInSchema = Joi.object({
    email: Joi.email().required(),
    password: Joi.password().required()
})

export default signInSchema