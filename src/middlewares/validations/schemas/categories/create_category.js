const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    name: Joi.string().max(64).required(), 
    text: Joi.string().max(1024).required(), 
    parent_id: Joi.string().guid({
        version: [
            'uuidv4',
            'uuidv5'
        ]
    }).optional(),
})

module.exports = schema