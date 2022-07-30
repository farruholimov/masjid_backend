const Joi = require('joi');

const schema = (key) => Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    phone: Joi.string().regex(/^\+\998[389][012345789][0-9]{7}$/).required(),
    password: Joi.string().min(6).max(64).required(),
    username: Joi.string().min(4).max(64).required(),
})

module.exports = schema