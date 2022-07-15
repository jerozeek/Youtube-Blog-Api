import Joi from 'joi';

export const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})

export const validateEmailOTP = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required().min(4),
})

export const validateEmail = Joi.object({
    email: Joi.string().email().required(),
})

export const validateSignup = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})

export const validateBlog = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.string().required(),
})