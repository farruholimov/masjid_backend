const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    category_id: Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(), 
    mosque_id: Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).required(),
    name: Joi.string().max(128).required(),
    text: Joi.string().max(2048).optional(),
    amount: Joi.number().integer().min(1).required(), 
    amount_type: Joi.string().required(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(), 
    status: Joi.number().max(2).valid(1, 2).optional(), 
})

module.exports = schema