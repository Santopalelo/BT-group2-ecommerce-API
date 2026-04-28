const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().trim().optional(),
  category: Joi.string().trim().required(),
  inStock: Joi.boolean().optional(),
});

const productUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  price: Joi.number().min(0).optional(),
  description: Joi.string().trim().optional(),
  category: Joi.string().trim().optional(),
  inStock: Joi.boolean().optional(),
}).min(1); // require at least one field

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors: errorMessages });
  }

  req.validatedData = value;
  next();
};

exports.validateProduct = validate(productValidationSchema);
exports.validateProductUpdate = validate(productUpdateSchema);
